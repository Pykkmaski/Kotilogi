import {useContext, useState} from 'react';
import AppContext from "../Contexts/AppContext";
import PropertiesGalleryContext from "../Contexts/PropertiesGalleryContext";
import useProperties from "../Hooks/useProperties";
import Button from "./Buttons/Button";
import { PropertyCard } from "./Cards/PropertyCard.new";
import NoProperties from "./Error/NoProperties";
import Gallery from './Gallery';
import Delete from '../Functions/Delete';
import AddProperty from '../Functions/AddProperty';
import { Redirect, useNavigate } from 'react-router-dom';

export function PropertiesGallery(props){
    const navigate = useNavigate();
    const {user} = useContext(AppContext);
    const [properties, loadProperties] = useProperties(user.email);
    //const [displayProperties, setDisplayProperties] = useState([]); //These change depending on what is typed in the search bar.
    const [selectedProperties, setSelectedProperties] = useState([]);

    if(!properties) return <Loading message="Ladataan Kiinteistöjä..."/>
    //setDisplayProperties(properties);

    function deleteProperties(){
        for(const id of arguments){
            console.log('Deleting property ' + id)
            Delete('/api/properties/' + id, () => null);
        }

        loadProperties();
        setSelectedProperties([]);
    }

    function selectProperty(id){
        const currentSelectedProperties = [...selectedProperties];

        const propertyIsSelected = currentSelectedProperties.find(item => item === id);

        if(propertyIsSelected) {
            const indexOfSelectedId = currentSelectedProperties.indexOf(id);
            currentSelectedProperties.splice(indexOfSelectedId, 1);
        }
        else{
            currentSelectedProperties.push(id);
        }

        setSelectedProperties(currentSelectedProperties);
    }
    function addProperty(){
        const newProperty = {
            owner: user.email,
        }

        AddProperty(newProperty, (newPropertyId) => {
            navigate(`/properties/${newPropertyId}/info`);
        });
    }
    const contextValue = {
        deleteProperties,
        selectProperty,
    }

    return (
        
            <Gallery>
                <PropertiesGalleryContext.Provider value={contextValue}>
                <Gallery.Header>
                    <div className="header-item">
                        <h1>Kiinteistöt</h1>
                    </div>
                    
                    <div className="header-item">
                        <button className="primary" disabled={selectedProperties.length === 0} onClick={() => deleteProperties(...selectedProperties)}>Poista</button>
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
                </PropertiesGalleryContext.Provider>
            </Gallery>
       
        
    );
}