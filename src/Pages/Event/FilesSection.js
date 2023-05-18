import {useContext, useState} from 'react';
import EventContext from '../../Contexts/EventContext';
import useEventFiles from '../../Hooks/useEventFiles';
import Section from '../../Components/Section';
import Gallery from '../../Components/Gallery';
import Button from '../../Components/Buttons/Button';
import UploadFile from '../../Functions/UploadFile';
import UploadFileModal from '../../Components/Modals/UploadFileModal';
import NoFiles from '../../Components/Error/NoFiles';
import FileCard from '../../Components/Cards/FileCard';

function FilesSection(props){

    const {event} = useContext(EventContext);
    const [files, loadFiles] = useEventFiles(event.id);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(false);
    
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
                        const url = `/api/files/events/${event.id}`;
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
                                const url = `/api/files/events/file/${file.id}`;
                                const element = <FileCard file={file}/>
                                
                                return (
                                    <a href={url} target="blank_"> 
                                       {element}
                                    </a>
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