"use client";
import axios from 'axios';
import { ContentType, GalleryOptions } from 'kotilogi-app/components/Gallery/Gallery';
import {createContext, useContext, useEffect, useState} from 'react';
import useSWR from 'swr';

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
    isLoading: boolean,
    error: any,
    selectedItems: number[],
    toggleSelected: (id: number) => void,
}

const GalleryContext = createContext({} as ProviderValueType);

export function useGallery(){
    return useContext(GalleryContext);
}

const fetcher = async (key) => axios.get(key).then(res => res.data);

export default function GalleryProvider(props){
    /**
     * Provides item selection functionality to galleries wrapped inside.
     */
    const {data, error, isLoading} = useSWR(props.contentSrc, fetcher);
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
    const contextValue: ProviderValueType = {
        options: props.options,
        contentType: props.options.contentType,
        data: data || [],
        isLoading,
        error,
        selectedItems,
        toggleSelected,
    }

    return (
        <GalleryContext.Provider value={contextValue}>
            {props.children}
        </GalleryContext.Provider>
    )
}