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

        usage.del(item)
        .catch(err => toast.error(err.message))
    }

    const getIcon = () => {
        if(item.type === 'heat'){
            return '/icons/flame.png';
        }
        else if(item.type === 'water'){
            return '/icons/drop.png';
        }
        else{
            return '/icons/bolt.png';
        }
    }

    const getIconColor = () => {
        return (
            item.type === 'heat' ? 'bg-heating'
            :
            item.type === 'water' ? colors.water
            :
            item.type === 'electric' ? colors.electric
            :
            'transparent'
        );
    }
    return (
        <ListItemContext.Provider value={{item, setShowEditModal}}>
            <EditModal show={showEditModal} onHide={() => setShowEditModal(false)} id={`${item.id}-edit-modal`}/>
            <span className="flex p-2 rounded-lg shadow-lg text-slate-500 justify-between border-gray-100 border hover:bg-orange-100">
                <div className="flex gap-4 items-center">
                    <div className={['flex p-1 rounded-md', `bg-${item.type}`].join(' ')}>
                        <img className={`aspect-square h-[1rem] ${item.type !== 'electric' ? 'invert' : 'filter-none'}`} src={getIcon()}/>
                    </div>
                    
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

    const getElements = (data: Kotilogi.UsageType[]) => {
        return data.map(i => {
            return <Item key={i.toString()} item={i} />
        });
    }

    const getElementsSortedByMonth = (data: Kotilogi.UsageType[]) => {
        var nextMonth = null;

        return (
            data.map((i, index: number) => {
                const dataMonth = new Date(i.time).getMonth();
                const items = [<Item item={i} key={i.toString()}/>];

                if(!nextMonth || dataMonth === nextMonth){
                    nextMonth = typeof dataMonth === 'number' ? dataMonth + 1 : 0;
                    items.unshift(<Divider month={monthNameToLang(dataMonth, 'fi')} margin={index === 0 ? 0 : 4}/>)
                }
                
                return items;
                
            })
        );
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