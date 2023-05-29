import UploadFile from "../../Functions/UploadFile";
import {useContext, useState} from 'react';
import usePropertyFiles from '../../Hooks/usePropertyFiles';
import Section from "../../Components/Section";
import Button from '../../Components/Buttons/Button';
import Gallery from '../../Components/Gallery';
import PropertyContext from "../../Contexts/PropertyContext";
import UploadFileModal from "../../Components/Modals/UploadFileModal";
import NoFiles from "../../Components/Error/NoFiles";
import EditButton from "../../Components/Buttons/EditButton";
import Modal from "../../Components/Modals/Modal";
import Delete from '../../Functions/Delete';
import FileCard from "../../Components/Cards/FileCard";

function FilesSection(props){
    const {property, loadProperty} = useContext(PropertyContext);
    const [showModal, setShowModal] = useState(false);

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [fileToBeDeleted, setFileToBeDeleted] = useState(null);

    const [files, loadFiles] = usePropertyFiles(property.id);
    const [editing, setEditing] = useState(false);

    function confirmDeletion(id){
        setFileToBeDeleted(id);
        setShowDeleteConfirmation(true);
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
                                    deleteFile: (file_id) => confirmDeletion(file_id),
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

                <Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
                    <Modal.Header>Vahvista Tiedoston Poisto</Modal.Header>
                    <Modal.Body>Haluatko varmasti poistaa tämän tiedoston?</Modal.Body>
                    <Modal.Footer>
                        <div className="group-row">
                            <Button className="primary" onClick={() => setShowDeleteConfirmation(false)}>Ei</Button>
                            <Button className="danger" onClick={() => Delete(`/api/files/properties/file/${fileToBeDeleted}`, () => {
                                setShowDeleteConfirmation(false);
                                loadFiles();
                            })}>Kyllä</Button>
                        </div>
                    </Modal.Footer>
                </Modal>

            </Section.Body>

            
        </Section>
        
    )
}

export default FilesSection;