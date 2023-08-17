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
import usePropertyImages from '../Hooks/usePropertyImages';

export function PropertyImagesGallery({property}){
    const navigate = useNavigate();
    const {user} = useContext(AppContext);
    const [images, loadImages] = usePropertyImages(property);
    //const [displayProperties, setDisplayProperties] = useState([]); //These change depending on what is typed in the search bar.
    const [selectedImages, setSelectedImages] = useState([]);

    if(!images) return <Loading message="Ladataan Kuvia..."/>
    //setDisplayProperties(properties);

    function deleteProperties(){
        for(const id of arguments){
            console.log('Deleting image ' + id)
            Delete('/api/images/' + id, () => null);
        }

        loadImages();
        setSelectedImages([]);
    }

    function selectImage(id){
        const currentSelectedImages = [...selectedImages];

        const imageIsSelected = currentSelectedImages.contains(id);

        if(imageIsSelected) {
            const indexOfSelectedId = currentSelectedImages.indexOf(id);
            currentSelectedImages.splice(indexOfSelectedId, 1);
        }
        else{
            currentSelectedImages.push(id);
        }

        setSelectedImages(currentSelectedImages);
    }
    function addImage(){
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
                    <div className="header">
                        <h1>Kiinteistöt</h1>
                    </div>
                    
                    <div className="group-row">
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