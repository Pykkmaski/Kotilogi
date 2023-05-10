import UploadFile from "../../Functions/UploadFile";
import AppModal from "../../Modals/AppModal";
import {useContext, useState} from 'react';
import usePropertyFiles from '../../Hooks/usePropertyFiles';
import Section from "../../Components/Section";
import Button from '../../Components/Button';
import Gallery from '../../Components/Gallery';
import PropertyContext from "../../Contexts/PropertyContext";

function FilesSection(props){
    const {property} = useContext(PropertyContext);
    const [showModal, setShowModal] = useState(false);
    const [files, loadFiles] = usePropertyFiles(property.id);

    return (
        <Section>
            <Section.Header>
                <div className="label-heading">
                    <span className="label">{property.address}</span>
                    <h1>Tiedostot</h1>
                </div>

                <div className="group-row">
                    <input type="search" placeholder="Etsi tiedostoja..." onChange={() => null}/>
                    <Button title="Lisää Tiedosto" variant="add" className="primary"/>
                </div>
                
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        {
                            files.map(id => {
                                return (
                                    <img src={'/'} width="200px" key={`property-${property.id}-file-${id}`}/>
                                )
                            })
                        }
                    </Gallery.Body>
                </Gallery>
            </Section.Body>

            <AppModal variant="upload/pdf" setShowModal={setShowModal} showModal={showModal} uploadFunction={
                (e) => {
                    e.preventDefault();
                    UploadFile(
                        e.target.pdf.files[0], 
                        'file', 
                        `/api/files/properties/${property.id}`, 
                        () => {
                            setShowModal(false);
                            loadFiles();
                        })
                }   
            }/>
        </Section>
        
    )
}

export default FilesSection;