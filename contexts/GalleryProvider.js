"use client";

/*
    Elements wrapped inside of this provider will be able to call functions
    to select, delete and add items of a type into a collection.

    It automatically saves the items in a backend using the provided apiRoute property,
    and updates client side data.
*/

import {createContext, useContext, useRef, useState} from 'react';
import Modal from 'kotilogi-app/components/Modals/Modal';
import axios from 'axios';
import useSWR from 'swr';
import { useSWRConfig } from 'swr';

const ItemGalleryContext = createContext();

const fetcher = url => axios.get(url).then(res => res.data);
const serverDeleteItem = async (url) => await axios.delete(url);
const mutateAddItem = async (url, item) => await axios.post(url, item);
const mutateUpdateItem = async (url, item) => await axios.update(url, item);

export function useItemGalleryContext(){
    return useContext(ItemGalleryContext);
}

export default function GalleryProvider({apiRoute, children}){
    const {data, error, isLoading, mutate: mutateList} = useSWR(apiRoute, fetcher);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    async function deleteItems(){
       const newItems = [...data];
        
        for(const id of arguments){
            const item = newItems.find(i => i.id === id);
            if(!item) continue; 

            const index = newItems.indexOf(item);
            newItems.splice(index, 1);
        }

        setSelectedItems([]);
        setShowDeleteModal(false);
        mutateList(newItems, false);
    }

    function selectAll(e){
        const checked = e.target.checked;

        if(checked){
            const newSelected = items.map(item => item.id);
            setSelectedItems(newSelected);
        }
        else{
            setSelectedItems([]);
        }
        
    }

    function selectItem(id){
        const currentSelectedItems = [...selectedItems];

        const itemIndex = currentSelectedItems.indexOf(id);

        if(itemIndex !== -1) {
            currentSelectedItems.splice(itemIndex, 1);
        }
        else{
            currentSelectedItems.push(id);
        }

        setSelectedItems(currentSelectedItems);
    }

    function addItem(item){
        const newData = [...data, item];
        mutateList(newData, false);
    }

    const contextValue = {
        deleteItems,
        selectItem,
        selectAll,
        addItem,
        setShowDeleteModal,
        selectedItems,
        items : data,
        showDeleteModal,
        loading: isLoading,
        error,
    }

    return (
        <ItemGalleryContext.Provider value={contextValue}>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header>Poista Kiinteistöt</Modal.Header>
                <Modal.Body>Oletko varma että haluat poistaa valitsemasi kiinteistöt?</Modal.Body>
                <Modal.Footer>
                    <button className="primary" onClick={() => setShowDeleteModal(false)}>Peruuta</button>
                    <button className="secondary" onClick={() => deleteItems(...selectedItems)}>Poista</button>
                </Modal.Footer>
            </Modal>

            {children}
        </ItemGalleryContext.Provider>
    );
}

