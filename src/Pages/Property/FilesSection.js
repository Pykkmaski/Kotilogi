import UploadFile from "../../Functions/UploadFile";
import {useContext, useState} from 'react';
import usePropertyFiles from '../../Hooks/usePropertyFiles';
import Section from "../../Components/Section";
import Button from '../../Components/Button';
import Gallery from '../../Components/Gallery';
import PropertyContext from "../../Contexts/PropertyContext";
import UploadFileModal from "../../Modals/UploadFileModal";

function FilesSection(props){
    const {property} = useContext(PropertyContext);
    const [showFileUploadModal, setShowFileUploadModal] = useState(false);
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
                    <Button title="Lisää Tiedosto" variant="add" className="primary" onClick={() => setShowModal(true)}/>
                </div>

                <UploadFileModal
                    showFileUploadModal={showFileUploadModal}
                    setShowFileUploadModal={setShowFileUploadModal}
                    uploadFunction={(e) => {
                        e.preventDefault();
                        const url = `/api/files/events/${event.id}`;
                        UploadFile(e.target)
                    }}
                />
                
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        {
                            files.map(id => {
                                const fileSrc = `/api/files/properties/file/${id.id}`
                                return (
                                    <Gallery.File src={fileSrc} width="200px" key={`property-${property.id}-file-${id}`}/>
                                )
                            })
                        }
                    </Gallery.Body>
                </Gallery>
            </Section.Body>

            
        </Section>
        
    )
}

export default FilesSection;