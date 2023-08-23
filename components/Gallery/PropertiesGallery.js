import {useContext, useState} from 'react';
import Button from "kotilogi-app/components/Buttons/Button";
import { PropertyCard } from "../Cards/ItemCard";
import NoProperties from "../Error/NoProperties";
import Gallery from './Gallery';
import PropertiesGalleryWrapper, { usePropertiesGalleryContext } from 'kotilogi-app/contexts/ItemGalleryContext';

export function PropertiesGallery(props){
    const properties = [
        {
            address: 'TestAddress',
            description: 'TestDescription',
        }
    ];

    if(!properties) return <Loading message="Ladataan Kiinteistöjä..."/>
    //setDisplayProperties(properties);

    const {selectAll, setShowDeleteModal, addProperty, selectedProperties} = usePropertiesGalleryContext();

    return (
        <Gallery>
            <PropertiesGalleryWrapper properties={properties}>

            <Gallery.Header>
                <div className="header-item">
                    <h1>Kiinteistöt</h1>
                </div>

                <div className="header-item"> 
                    <input id="select-all" type="checkbox" onChange={selectAll} data-selected-count={selectedProperties.length}></input> 

                    <button className="primary" disabled={selectedProperties.length === 0} onClick={() => setShowDeleteModal(true)}>Poista</button>
                    <Button id="add-property-btn" className="primary add-btn" variant="add" onClick={addProperty}>Lisää Talo</Button>
                </div>
            </Gallery.Header>

            <Gallery.Body>
                {
                    properties.length ? 
                    properties.map(item => {
                        return <PropertyCard property={item}/>
                    })
                    :
                    <NoProperties/>
                }
            </Gallery.Body>
            </PropertiesGalleryWrapper>
        </Gallery>
    );
}