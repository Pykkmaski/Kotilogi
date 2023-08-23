"use client";

import {createContext, useContext, useRef, useState} from 'react';
import Modal from 'kotilogi-app/components/Modals/Modal';
import axios from 'axios';

const ItemGalleryContext = createContext();

export function useItemGalleryContext(){
    return useContext(ItemGalleryContext);
}

export default function ItemGalleryWrapper({content, apiRoute, children}){
    const [items, setItems] = useState(content);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    //const [displayProperties, setDisplayProperties] = useState([]); //These change depending on what is typed in the search bar.
    const [selectedItems, setSelectedItems] = useState([]);
    const loading = useRef(false);

    async function deleteSelected(){
        for(const item of selectedItems){
            await axios.delete(apiRoute + item.id);
        }

        setSelectedItems([]);
    }

    async function deleteItems(){
        loading.current = true;
       const newItems = [...items];
        
        for(const id of arguments){
            const item = newItems.find(i => i.id === id);
            if(!item) continue;
            const index = newItems.indexOf(item);
            newItems.splice(index, 1);
            await axios.delete('/api/properties/' + item.id);
        }

        setItems(newItems);

        //loadItems();
        setSelectedItems([]);
        setShowDeleteModal(false);
        loading.current = false;
    }

    function selectAll(e){
        const checked = e.target.checked;

        if(checked){
            const newSelected = items.map(item => item.id);
            console.log(newSelected);
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

    function addItem(callback){
        callback();
    }

    const contextValue = {
        deleteItems,
        deleteSelected,
        selectItem,
        selectAll,
        addItem,
        setShowDeleteModal,
        selectedItems,
        items,
        setItems,
        showDeleteModal,
        loading: loading.current,
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

