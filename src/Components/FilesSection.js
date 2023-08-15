import UploadFile from "../Functions/UploadFile";
import {useState, useRef} from 'react';
import {Link} from 'react-router-dom';
import Section from "./Section";
import Button from './Buttons/Button';
import Gallery from './Gallery';
import UploadFileModal from "./Modals/UploadFileModal";
import NoFiles from "./Error/NoFiles";
import EditButton from "./Buttons/EditButton";
import ConfirmModal from "./Modals/ConfirmModal";
import Delete from '../Functions/Delete';
import FileCard from "./Cards/FileCard";
import EditFileInfoModal from "./Modals/EditFileInfoModal";
import Update from "../Functions/Update";

function FilesSection(props){
    const {files, loadFiles} = props;

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [editing, setEditing] = useState(false);

    const selectedFile = useRef(null);

    function deleteFile(file){
        selectedFile.current = file;
        setShowDeleteModal(true);
    }

    function confirmDelete(){
        const url = props.baseUrl + '/file/' + selectedFile.current.id;
        Delete(url, () => loadFiles());
        setShowDeleteModal(false);
    }

    function updateFileData(e){
        e.preventDefault();
        const body = {
            title: e.target.title.value,
            description: e.target.description.value,
        }

        const url = props.baseUrl + '/file/' + selectedFile.current.id;
        Update(url, body, () => loadFiles());
        setShowEditModal(false);
    }

    function updateData(file){
        selectedFile.current = file;
        setShowEditModal(true);
    }

    return (
        <Section>
            <Section.Header>
                <div className="label-heading">
                    {
                        props.target.address ? <span className="label">{props.target.address}</span> : null
                    }
                    
                    <h1>Tiedostot</h1>
                </div>

                <div className="group-row">
                    <EditButton
                        editFunction={() => setEditing(true)}
                        cancelFunction={() => setEditing(false)}
                        hidden={files.length === 0}
                    >Muokkaa</EditButton>
                    <Button variant="add" className="primary" onClick={() => setShowUploadModal(true)}>Lisää Tiedosto</Button>
                </div>

                <UploadFileModal
                    showModal={showUploadModal}
                    setShowModal={setShowUploadModal}
                    uploadFunction={(e) => {
                        e.preventDefault();
                        e.target.submit_button.disabled = true;

                        const url = props.baseUrl + '/' + props.target.id;
                        const title = e.target.title.value;
                        const descr = e.target.description.value;
                        
                        UploadFile(e.target.file.files[0], title, descr, 'file', url, () => loadFiles());
                        setShowUploadModal(false);

                        e.target.submit_button.disabled = false;
                    }}
                />

                <EditFileInfoModal
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                    onSubmit={updateFileData}
                />

                <ConfirmModal
                    showModal={showDeleteModal}
                    setShowModal={setShowDeleteModal}

                    title="Poista Tiedosto"
                    text={`Haluatko varmasti poistaa tiedoston ${selectedFile.current?.title || selectedFile.current?.filename}`}

                    onConfirm={confirmDelete}

                    onCancel={() => {
                        setShowConfirmationModal(false);
                    }}
                />
                
            </Section.Header>

            <Section.Body>
                <Gallery>
                    <Gallery.Body className={files.length === 0 ? 'empty' : null}>
                        {
                            files.length ?
                            files.map(file => {
                                const fileSrc = props.baseUrl + '/file/' + file.id;
                                const element = <FileCard file={file} editing={editing} functions={{
                                    deleteFile,
                                    updateData,
                                }}/>

                                return (
                                    !editing ?
                                    <Link className="container-link" to={fileSrc} target="_blank">
                                        {element}
                                    </Link>
                                    :
                                    element
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