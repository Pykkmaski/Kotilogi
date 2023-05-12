import {useContext, useState} from 'react';
import EventContext from '../../Contexts/EventContext';
import useEventFiles from '../../Hooks/useEventFiles';
import Section from '../../Components/Section';
import Gallery from '../../Components/Gallery';
import Button from '../../Components/Button';
import UploadFile from '../../Functions/UploadFile';
import UploadFileModal from '../../Modals/UploadFileModal';

function FilesSection(props){

    const {event} = useContext(EventContext);
    const [files, loadFiles] = useEventFiles(event.id);
    const [showModal, setShowModal] = useState(false);

    
    return (
        <Section>
            <Section.Header>
                <h1>Tiedostot</h1>
                <div className="group-row">
                    <input type="search" placeholder="Etsi Tiedostoja..."/>
                    <Button variant="add" className="primary" title="Lisää Tiedosto" onClick={() => setShowModal(true)}/>
                </div>

                <UploadFileModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    uploadFunction={(e) => {
                        e.preventDefault();
                        const url = `/api/files/events/${event.id}`;
                        UploadFile(e.target.pdf.files[0], 'pdf', url, () => loadFiles());
                        setShowModal(false);
                    }}
                />

            </Section.Header>
            
            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                    </Gallery.Body>
                </Gallery>
            </Section.Body>
        </Section>
    )
}

export default FilesSection;