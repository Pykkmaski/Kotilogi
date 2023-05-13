import UploadFile from "../../Functions/UploadFile";
import {useContext, useState} from 'react';
import usePropertyFiles from '../../Hooks/usePropertyFiles';
import Section from "../../Components/Section";
import Button from '../../Components/Button';
import Gallery from '../../Components/Gallery';
import PropertyContext from "../../Contexts/PropertyContext";
import UploadFileModal from "../../Components/Modals/UploadFileModal";
import NoFiles from "../../Components/Error/NoFiles";

function FilesSection(props){
    const {property, loadProperty} = useContext(PropertyContext);
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
                    <Button variant="add" className="primary" onClick={() => setShowModal(true)}>Lisää Tiedosto</Button>
                </div>

                <UploadFileModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    uploadFunction={(e) => {
                        e.preventDefault();
                        const url = `/api/files/properties/${property.id}`;
                        UploadFile(e.target.file.files[0], 'file', url, () => loadFiles());
                        setShowModal(false);
                    }}
                />
                
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        {
                            files.length ?
                            files.map(file => {
                                const fileSrc = `/api/files/properties/file/${file.id}`
                                return (
                                    <Gallery.File url={fileSrc} file={file} width="200px" key={`property-${property.id}-file-${file.id}`}/>
                                )
                            })
                            :
                            <NoFiles/>
                        }
                    </Gallery.Body>
                </Gallery>
            </Section.Body>

            
        </Section>
        
    )
}

export default FilesSection;