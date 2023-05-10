import UploadFile from "../Functions/UploadFile";
import AppModal from "../Modals/AppModal";
import {useState} from 'react';
import usePropertyFiles from '../Hooks/usePropertyFiles';
import Section from "./Section";
import Button from './Button';

const { default: Gallery } = require("./Gallery");

function PropertyFilesSection({property_id}){
    const [showModal, setShowModal] = useState(false);
    const [files, loadFiles] = usePropertyFiles(property_id);

    return (
        <Section>
            <Section.Header>
                <h1>Tiedostot</h1>
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
                                    <img src={'/'} width="200px" key={`property-${property_id}-file-${id}`}/>
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
                        `/api/files/properties/${property_id}`, 
                        () => {
                            setShowModal(false);
                            loadFiles();
                        })
                }   
            }/>
        </Section>
        
    )
}

export default PropertyFilesSection;