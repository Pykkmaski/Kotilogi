'use client';

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Modal, { ModalProps } from "../Modals/Modal";
import { Input } from "../Input/Input";
import { PrimaryButton } from "../Button/PrimaryButton";
import { SecondaryButton } from "../Button/SecondaryButton";
import toast from "react-hot-toast";
import * as usage from '@/actions/usage';
import { useInputData } from "../Modals/BaseAddModal.hooks";
import { colors } from "kotilogi-app/apex.config";
import { splitByMonth } from "kotilogi-app/actions/usage.utils";
import { monthNameToLang } from "kotilogi-app/utils/translate/planNameToLang";
import { Icon } from "./Icon";

const ListItemContext = createContext<any>(null);

function EditModal(props: ModalProps){

    const {item, setShowEditModal} = useItemContext();
    const {data, updateData, reset} = useInputData({...item});
    const formRef = useRef<HTMLFormElement | null>(null);
    const [status, setStatus] = useState<'loading' | 'idle'>('idle');

    const closeModal = () => {
        formRef.current?.reset();
        reset({...item});
        props.onHide();
    }

    const update = () => {
        setStatus('loading');
        usage.update(data)
        .catch(err => toast.error(err.message))
        .finally(() => {
            closeModal();
            setStatus('idle');
        });
    }

    const loading = status === 'loading';

    return (
        <Modal {...props} >
             <Modal.Header>Muokkaa kulutustietoa</Modal.Header>  
             <Modal.Body>
                <form>
                    <Input 
                        label="Hinta"
                        description="Laskun hinta."
                        name="price" 
                        type="number" 
                        step="0.01"
                        min="0.01"
                        defaultValue={item.price} 
                        onInput={updateData}/>
                </form>
                
            </Modal.Body> 

            <Modal.Footer>
                <SecondaryButton 
                    disabled={loading}
                    onClick={() => setShowEditModal(false)}
                    >Peruuta</SecondaryButton>

                <PrimaryButton 
                    loading={loading}
                    disabled={loading}
                    onClick={update}
                    >Päivitä</PrimaryButton>
            </Modal.Footer>
        </Modal>
    )
}

type ListItemProps = {
    item: Kotilogi.UsageType,
}

function Item({item}: ListItemProps){
    const [showEditModal, setShowEditModal] = useState(false);
    
    const deleteItem = () => {
        const c = confirm('Olet poistamassa tietoa. Oletko varma?');
        if(!c) return;

        const loadingToast = toast.loading('Poistetaan tietoa...');

        usage.del(item)
        .then(() => toast.success('Tieto poistettu.'))
        .catch(err => toast.error(err.message))
        .finally(() => toast.dismiss(loadingToast))
    }

    return (
        <ListItemContext.Provider value={{item, setShowEditModal}}>
            <EditModal show={showEditModal} onHide={() => setShowEditModal(false)} id={`${item.id}-edit-modal`}/>
            <span className="flex p-2 rounded-lg shadow-lg text-slate-500 justify-between border-gray-100 border hover:bg-orange-100">
                <div className="flex gap-4 items-center">
                    <Icon type={item.type}/>
                    <h1 className="text-slate-500 font-semibold flex-1">{item.price.toFixed(2)}€</h1>
                    <span className="text-sm flex-1">{item.time}</span>
                </div>
                
                <div className="flex gap-4 items-center">
                    <span className="cursor-pointer" onClick={() => setShowEditModal(true)}>Muokkaa</span>
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

function useItemContext(){
    const context = useContext(ListItemContext);
    if(!context) throw new Error('useItemContext must be used within the scope of an ItemContext');
    return context;
}