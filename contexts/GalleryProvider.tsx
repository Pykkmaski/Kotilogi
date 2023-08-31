"use client";
import addEvent from 'kotilogi-app/actions/addEvent';
import addProperty from 'kotilogi-app/actions/addProperty';
import { deleteProperties } from 'kotilogi-app/actions/deleteProperties';
import { deleteEvents } from 'kotilogi-app/actions/deleteEvents';
import { ContentType, GalleryOptions } from 'kotilogi-app/components/Gallery/Types';
import {createContext, experimental_useOptimistic as useOptimistic, useContext, useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import { revalidatePath } from 'next/cache';
import { usePathname } from 'next/navigation';

export type ItemType = {
    id: string | number,
    title: string,
    description?: string,
}

export type SelectedStates = 'selected' | 'deselected';

export type SelectedItemsType = {
    [key: number] : SelectedStates,
}

export type ProviderValueType = {
    options: GalleryOptions,
    contentType: ContentType,
    data: any,
    selectedItems: number[],
    toggleSelected: (id: number) => void,   
    deleteSelected: () => void,
    addData: (newData: any) => void,
}

const GalleryContext = createContext({} as ProviderValueType);

export function useGallery(){
    return useContext(GalleryContext);
}

interface GalleryProviderProps{
    options: GalleryOptions,
    data: any,
    children: any,
}

export default function GalleryProvider(props: GalleryProviderProps){
    /**
     * Provides item selection functionality to galleries wrapped inside.
     */
    const pathname = usePathname();
    const [optimisticData, addOptimisticData] = useOptimistic(
        props.data,
        (state, newData) => [
            ...state,
            newData
        ]
    );

    const [selectedItems, setSelectedItems] = useState([] as number[]);

    function toggleSelected(id: number){
        const newSelected = [...selectedItems];
        if(newSelected.includes(id)){
            newSelected.splice(newSelected.indexOf(id), 1);
        }
        else{
            newSelected.push(id);
        }
        
        setSelectedItems(newSelected);
    }

    async function deleteSelected(){
        //const newData = [...optimisticData];

        const runDelete = () => {
            selectedItems.forEach((id: number) => {
                const itemInData = optimisticData.find(d => d.id === id);
                if(!itemInData) return;
                optimisticData.splice(optimisticData.indexOf(itemInData), 1);
            });
        } 
        
        try{
            switch(props.options.contentType){
                case 'property':{
                    runDelete();
                    const error = await deleteProperties(selectedItems);
                    if(error) throw error;

                    toast.success('Talo(t) poistettu onnistuneesi!');
                }
                break;

                case 'event':{
                    runDelete();
                    const error = await deleteEvents(selectedItems);
                    console.log(error);
                    if(error) throw error;

                    toast.success('Tapahtuma(t) poistettu onnistuneesti!');
                }
                break;
    
                default: throw new Error('Tätä toimintoa ei ole määritelty!');
            }

            revalidatePath(pathname);
            setSelectedItems([]);
        }
        catch(err){
            toast.error(err.message);
        }
        
        
    }

    async function addData(newData: any){
        try{
            switch(props.options.contentType){
                case 'property':{
                    const id = await addProperty(newData);
                    newData.id = id;
                    addOptimisticData(newData);
                    toast.success('Talo lisätty onnistuneesti');
                }
                break;

                case 'event':{
                    const id = await addEvent(newData);
                    newData.id = id;
                    addOptimisticData(newData);
                    toast.success('Tapahtuma lisätty onnistuneesti!');
                }
                break;
    
                default: throw new Error('Tätä toimintoa ei ole määritelty!');
            }
        }
        catch(err){
            toast.error(err.message);
        }

        revalidatePath(pathname);
    }

    const contextValue: ProviderValueType = {
        options: props.options,
        contentType: props.options.contentType,
        data: optimisticData || [],
        selectedItems,
        toggleSelected,
        deleteSelected,
        addData,
    }

    return (
        <GalleryContext.Provider value={contextValue}>
            {props.children}
        </GalleryContext.Provider>
    )
}
