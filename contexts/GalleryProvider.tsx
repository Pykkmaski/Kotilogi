"use client";
import { serverAddData } from 'kotilogi-app/actions/serverAddData';
import { serverDeleteDataByIds } from 'kotilogi-app/actions/serverDeleteDataByIds';
import { ContentType, GalleryOptions } from 'kotilogi-app/components/Gallery/Types';
import { EventType } from 'kotilogi-app/types/EventType';
import { IdType } from 'kotilogi-app/types/Types';
import { PropertyType } from 'kotilogi-app/types/PropertyType';
import {createContext, experimental_useOptimistic as useOptimistic, useContext, useEffect, useState} from 'react';
import toast from 'react-hot-toast';

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
    contentTarget: ContentType,
    data: any,
    selectedItems: string[],
    toggleSelected: (id: string) => void,   
    deleteSelected: () => void,
    addData: (newData: any) => void,
}

const GalleryContext = createContext({} as ProviderValueType);

type GalleryTypes = PropertyType | EventType;

interface GalleryProviderProps{
    options: GalleryOptions,
    data: GalleryTypes[],
    children: React.ReactNode,
}

export default function GalleryProvider(props: GalleryProviderProps){
    /**
     * Provides item selection functionality to galleries wrapped inside.
     */

    const [optimisticData, addOptimisticData] = useOptimistic(
        props.data,
        (state, newData: GalleryTypes) => {
            return [...state, newData];
        }
    );

    const [data, setData] = useState<GalleryTypes[]>(props.data);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    function toggleSelected(id: string){
        const newSelected: string[] = [...selectedItems];

        if(newSelected.includes(id)){
            newSelected.splice(newSelected.indexOf(id), 1);
        }
        else{
            newSelected.push(id);
        }
        
        setSelectedItems(newSelected);
    }

    async function deleteSelected(){
        try{
            const success: boolean = await serverDeleteDataByIds(selectedItems, props.options.contentTarget);
            if(!success) throw new Error('Kohteiden poisto epäonnistui!');
            
            const newData: GalleryTypes[] = [...data];
            selectedItems.forEach((id: IdType) => {
                const item: GalleryTypes | undefined = newData.find((i: GalleryTypes & {id: string}) => i.id === id);
                if(!item) return;

                const index: number = newData.indexOf(item);
                if(index === -1) return; //This should not fail at this point, but you never know.
                newData.splice(index, 1);
            });
            
            setData(newData);
            toast.success('Kohteiden poisto onnistui!');
        }
        catch(err){
            toast.error(err.message);
        }
        finally{
            setSelectedItems([]);
        }
    }

    async function addData(newData: any){
        try{
            const addedItem: GalleryTypes | null = await serverAddData(newData, props.options.contentTarget);
            if(!addedItem) throw new Error('Kohteen lisääminen epäonnistui!');

            setData(prev => [...prev, addedItem!]);
            toast.success('Kohteen lisäys onnistui!');
        }
        catch(err){
            toast.error(err.message);
        }
    }

    const contextValue: ProviderValueType = {
        options: props.options,
        contentTarget: props.options.contentTarget,
        data: data || [],
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

export function useGallery(){
    return useContext(GalleryContext);
}
