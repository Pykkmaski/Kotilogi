'use client';

import { createContext, useContext, useRef, useState } from "react";
import Modal, { ModalProps } from "../Modals/Modal";
import { Input } from "../Input/Input";
import { PrimaryButton } from "../Button/PrimaryButton";
import { SecondaryButton } from "../Button/SecondaryButton";
import toast from "react-hot-toast";
import * as usage from '@/actions/usage';
import { splitByMonth } from "kotilogi-app/actions/usage.utils";
import { monthNameToLang } from "kotilogi-app/utils/translate/planNameToLang";
import { Icon } from "./Icon";
import { ModalRefType } from "../Experimental/Modal/Modal";
import EditUsageModal from "./EditUsageModal";

const ListItemContext = createContext<any>(null);

function EditModal(props: ModalProps){
    const {item} = useItemContext();
    
    const initialData = {id: item.id};
    const formRef = useRef<HTMLFormElement | null>(null);
    const [status, setStatus] = useState<'loading' | 'idle'>('idle');

    const closeModal = () => {
        formRef.current?.reset();
        props.onHide();
    }

    const update = (e) => {
        e.preventDefault();
        setStatus('loading');

        const d = {
            ...item,
            price : e.target.price.valueAsNumber,
        }

        usage.update(d)
        .catch(err => toast.error(err.message))
        .finally(() => {
            closeModal();
            setStatus('idle');
        });
    }

    const loading = status === 'loading';

    const formId = props.id + '-form';
    return (
        <Modal {...props} >
             <Modal.Header>Muokkaa kulutustietoa</Modal.Header>  
             <Modal.Body>
                <form onSubmit={update} id={formId}>
                    <Input 
                        label="Hinta"
                        description="Laskun hinta."
                        name="price" 
                        type="number" 
                        step="0.01"
                        min="0.01"
                        defaultValue={item.price} 
                    />
                </form>
                
            </Modal.Body> 

            <Modal.Footer>
                <SecondaryButton 
                    disabled={loading}
                    onClick={() => props.onHide()}
                    >Peruuta</SecondaryButton>

                <PrimaryButton 
                    loading={loading}
                    disabled={loading}
                    form={formId}
                    >Päivitä</PrimaryButton>
            </Modal.Footer>
        </Modal>
    );
}

type ListItemProps = {
    item: Kotilogi.UsageType,
}

function Item({item}: ListItemProps){
    //const [showEditModal, setShowEditModal] = useState(false);
    const editModalRef = useRef<ModalRefType>(null);
    
    const deleteItem = () => {
        const c = confirm('Olet poistamassa tietoa. Oletko varma?');
        if(!c) return;

        const loadingToast = toast.loading('Poistetaan tietoa...');
        
        console.log('Deleting item ' + JSON.stringify(item));
        
        usage.del(item)
        .then(() => toast.success('Tieto poistettu.'))
        .catch(err => toast.error(err.message))
        .finally(() => toast.dismiss(loadingToast))
    }

    return (
        <ListItemContext.Provider value={{item}}>
            <EditUsageModal ref={editModalRef}/>
            <span className="flex p-2 rounded-lg shadow-lg text-slate-500 justify-between border-gray-100 border hover:bg-orange-100">
                <div className="flex gap-4 items-center">
                    <Icon type={item.type}/>
                    <h1 className="text-slate-500 font-semibold flex-1">{item.price.toFixed(2)}€</h1>
                    <span className="text-sm flex-1">{item.time}</span>
                </div>
                
                <div className="flex gap-4 items-center">
                    <span className="cursor-pointer" onClick={() => editModalRef.current?.toggleOpen(true)}>Muokkaa</span>
                    <span className="font-semibold cursor-pointer" onClick={deleteItem}>Poista</span>
                </div>
            </span>
        </ListItemContext.Provider>    
    );
}

type DataListProps = {
    data: Kotilogi.UsageType[],
}

export function DataList({data}: DataListProps){
    const dataSorted = data.sort((a, b) => {
        const timeA = new Date(a.time).getTime();
        const timeB = new Date(b.time).getTime();

        return timeA - timeB;
    });

    const Divider = ({month, margin}) => (
        <div className={`w-full border-b border-slate-200 mt-${margin}`} key={`divider-${month}`}>
            {month}
        </div>
    );

    const getElementsSortedByMonth = (data: Kotilogi.UsageType[]) => {
        const splitData = splitByMonth(data);
        const elements: JSX.Element[] = [];

        for(var month = 0; month < splitData.length; ++month){
            const currentMonthData = splitData[month];
            if(currentMonthData.length){
                elements.push(
                    <>
                        <Divider month={monthNameToLang(month, 'fi')} margin={elements.length === 0 ? 0 : 4}/>
                        {
                            currentMonthData.map(d => <Item item={d} key={d.toString()}/>)
                        }
                    </>
                );
            }
        }

        console.log(splitData);
        return elements;
    }

    return (
        <div className="flex flex-col gap-2 max-h-full overflow-hidden">
            {
                getElementsSortedByMonth(dataSorted)
            }
        </div>
    );
}

export function useItemContext(){
    const context = useContext(ListItemContext);
    if(!context) throw new Error('useItemContext must be used within the scope of an ItemContext');
    return context;
}