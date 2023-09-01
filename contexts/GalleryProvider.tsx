"use client";
import addEvent from 'kotilogi-app/actions/addEvent';
import addProperty from 'kotilogi-app/actions/addProperty';
import { deleteProperties } from 'kotilogi-app/actions/deleteProperties';
import { deleteEvents } from 'kotilogi-app/actions/deleteEvents';
import { ContentType, GalleryOptions } from 'kotilogi-app/components/Gallery/Types';
import {createContext, experimental_useOptimistic as useOptimistic, useContext, useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import generateId from 'kotilogi-app/utils/generateId';
import addPropertyFile from 'kotilogi-app/actions/addPropertyFile';

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
    selectedItems: string[],
    toggleSelected: (id: string) => void,   
    deleteSelected: () => void,
    addData: (newData: any) => void,
}

const GalleryContext = createContext({} as ProviderValueType);

interface GalleryProviderProps<T>{
    options: GalleryOptions,
    data: T[],
    children: React.ReactNode,
}

export default function GalleryProvider<T>(props: GalleryProviderProps<T>){
    /**
     * Provides item selection functionality to galleries wrapped inside.
     */

    const [optimisticData, addOptimisticData] = useOptimistic(
        props.data,
        (state, newData: T) => {
            return [...state, newData];
        }
    );

    const [data, setData] = useState<T[]>(props.data);
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

    const handleResult = (result: {message: string} | string | null) => {
        if(typeof result === 'object' && result !== null){
            console.log(result.message);
            toast.error('Kohteiden poisto epäonnistui!');
        }
        else {
            toast.success('Kohteiden poisto onnistui!');
        }
    }

    async function deleteSelected(){

        /*
        for(const id of selectedItems){
            const item: T | undefined = optimisticData.find((i: T & {id: string}) => i.id === id);
            if(!item) continue;

            const index: number = optimisticData.indexOf(item);
            if(index === -1) continue; //This should not fail at this point, but you never know.
            optimisticData.splice(index, 1);
        }
        */

        var result: null | {message: string} = null;
        const contentType: ContentType = props.options.contentType;

        if(contentType === 'property'){
            result = await deleteProperties(selectedItems);
        }
        else if(contentType === 'event'){
            result = await deleteEvents(selectedItems);
        }
        else {
            result = {
                message: 'Toimintoa ei ole määritelty!'
            }
        }
        
        handleResult(result);
        setSelectedItems([]);
    }

    async function addData(newData: any){
        newData.id = await generateId();
        addOptimisticData(newData);

        var result: string | {message: string} | null = null;
        const contentType: ContentType = props.options.contentType;

        if(contentType === 'property'){
            result = await addProperty(newData);
        }
        else if(contentType === 'event'){
            result = await addEvent(newData);
        }
        else{
            result = {
                message: 'Toimintoa ei ole määritelty!',
            }
        }

        handleResult(result);
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

export function useGallery(){
    return useContext(GalleryContext);
}
