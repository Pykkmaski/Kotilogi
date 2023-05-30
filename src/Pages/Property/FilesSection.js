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
import EditFileInfoModal from "../../Components/Modals/EditFileInfoModal";

function FilesSection(props){
    const {property, loadProperty} = useContext(PropertyContext);
    const [showModal, setShowModal] = useState(false);
    const [showEditFileModal, setShowEditFileModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [files, loadFiles] = usePropertyFiles(property.id);
    const [editing, setEditing] = useState(false);

    const selectedFile = useRef(null);

    function deleteFile(file){
        selectedFile.current = file;
        setShowConfirmationModal(true);
    }

    function updateFileData(e){
        e.preventDefault();
        const body = {
            title: e.target.title.value,
            description: e.target.description.value,
        }
        Update(`/api/files/properties/${property.id}/file/${selectedFile.current.id}`, body, () => loadFiles());
        setShowEditFileModal(false);
    }

    function updateData(file){
        selectedFile.current = file;
        setShowEditFileModal(true);
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

                <EditFileInfoModal
                    showModal={showEditFileModal}
                    setShowModal={setShowEditFileModal}
                    onSubmit={updateFileData}
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
                                    deleteFile,
                                    updateData,
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
                    text={`Haluatko varmasti poistaa tiedoston ${selectedFile.current?.title || selectedFile.current?.filename}`}

                    onConfirm={() => {
                        Delete(`/api/files/properties/file/${selectedFile.current?.id}`, () => loadFiles());
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