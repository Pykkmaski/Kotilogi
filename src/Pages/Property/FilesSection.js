import UploadFile from "../../Functions/UploadFile";
import {useContext, useState, useRef} from 'react';
import usePropertyFiles from '../../Hooks/usePropertyFiles';
import Section from "../../Components/Section";
import Button from '../../Components/Buttons/Button';
import Gallery from '../../Components/Gallery';
import PropertyContext from "../../Contexts/PropertyContext";
import UploadFileModal from "../../Components/Modals/UploadFileModal";
import NoFiles from "../../Components/Error/NoFiles";
import EditButton from "../../Components/Buttons/EditButton";
import ConfirmModal from "../../Components/Modals/ConfirmModal";
import Delete from '../../Functions/Delete';
import FileCard from "../../Components/Cards/FileCard";

function FilesSection(props){
    const {property, loadProperty} = useContext(PropertyContext);
    const [showModal, setShowModal] = useState(false);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [files, loadFiles] = usePropertyFiles(property.id);
    const [editing, setEditing] = useState(false);

    const fileToBeDeleted = useRef(null);

    function confirmDeletion(file){
        fileToBeDeleted.current = file;
        setShowConfirmationModal(true);
    }

    return (
        <Section>
            <Section.Header>
                <div className="label-heading">
                    <span className="label">{property.address}</span>
                    <h1>Tiedostot</h1>
                </div>

                <div className="group-row">
                    <EditButton
                        editFunction={() => setEditing(true)}
                        cancelFunction={() => setEditing(false)}
                    >Muokkaa</EditButton>
                    <Button variant="add" className="primary" onClick={() => setShowModal(true)}>Lisää Tiedosto</Button>
                </div>

                <UploadFileModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    uploadFunction={(e) => {
                        e.preventDefault();
                        e.target.submit_button.disabled = true;

                        const url = `/api/files/properties/${property.id}`;
                        const title = e.target.title.value;
                        const descr = e.target.description.value;

                        UploadFile(e.target.file.files[0], title, descr, 'file', url, () => loadFiles());
                        setShowModal(false);

                        e.target.submit_button.disabled = false;
                    }}
                />
                
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        {
                            files.length ?
                            files.map(file => {
                                const fileSrc = `/api/files/properties/file/${file.id}`;
                                const element = <FileCard file={file} editing={editing} functions={{
                                    deleteFile: (file) => confirmDeletion(file),
                                    editTitle: (file_id) => Update(`/api/files/properties/file/${file_id}`, () => loadFiles()),
                                }}/>

                                return (
                                    !editing ?
                                    <a className="container-link" href={fileSrc} target="_blank">
                                        {element}
                                    </a>
                                    :
                                    element
                                )
                            })
                            :
                            <NoFiles/>
                        }

                    </Gallery.Body>
                </Gallery>

                <ConfirmModal
                    showModal={showConfirmationModal}
                    setShowModal={setShowConfirmationModal}

                    title="Poista Tiedosto"
                    text={`Haluatko varmasti poistaa tiedoston ${fileToBeDeleted.current?.title || fileToBeDeleted.current?.filename}`}

                    onConfirm={() => {
                        Delete(`/api/files/properties/file/${fileToBeDeleted.current?.id}`, () => loadFiles());
                        setShowConfirmationModal(false);
                    }}

                    onCancel={() => {
                        setShowConfirmationModal(false);
                    }}
                />

            </Section.Body>

            
        </Section>
        
    )
}

export default FilesSection;