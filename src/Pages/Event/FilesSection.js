import {useContext, useState, useRef} from 'react';
import EventContext from '../../Contexts/EventContext';
import useEventFiles from '../../Hooks/useEventFiles';
import Section from '../../Components/Section';
import Gallery from '../../Components/Gallery';
import Button from '../../Components/Buttons/Button';
import UploadFile from '../../Functions/UploadFile';
import UploadFileModal from '../../Components/Modals/UploadFileModal';
import NoFiles from '../../Components/Error/NoFiles';
import FileCard from '../../Components/Cards/FileCard';
import ConfirmModal from '../../Components/Modals/ConfirmModal';
import Delete from '../../Functions/Delete';

function FilesSection(props){

    const {event} = useContext(EventContext);
    const [files, loadFiles] = useEventFiles(event.id);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const fileToBeDeleted = useRef(null);

    return (
        <Section id="event-files-section">
            <Section.Header>
                <h1>Tiedostot</h1>
                <div className="group-row">
                    <Button className={editing ? 'secondary' : 'primary'} onClick={() => setEditing(!editing)}>{editing ? 'Lopeta Muokkaus' : 'Muokkaa'}</Button>
                    <Button variant="add" className="primary" onClick={() => setShowModal(true)}>Lisää Tiedosto</Button>
                </div>

                <UploadFileModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    uploadFunction={(e) => {
                        e.preventDefault();
                        e.target.submit_button.disabled = true;

                        const url = `/api/files/events/${event.id}`;
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
                                const url = `/api/files/events/file/${file.id}`;
                                const element = <FileCard file={file} editing={editing} functions={{
                                    deleteFile: (file_id) => {
                                        fileToBeDeleted.current = file_id;
                                        setShowConfirmationModal(true);
                                        console.log('kalja');
                                    }
                                }}/>
                                
                                return (
                                    !editing ?
                                    <a className="container-link" href={url} target="_blank"> 
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
                text="Oletko varma että haluat poistaa tiedoston?"
                onConfirm={() => {
                    Delete(`/api/files/events/file/${fileToBeDeleted.current}`, () => loadFiles());
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