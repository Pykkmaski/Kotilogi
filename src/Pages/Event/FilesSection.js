import {useContext, useState} from 'react';
import EventContext from '../../Contexts/EventContext';
import useEventFiles from '../../Hooks/useEventFiles';
import Section from '../../Components/Section';
import Gallery from '../../Components/Gallery';
import Button from '../../Components/Button';
import UploadFile from '../../Functions/UploadFile';
import UploadFileModal from '../../Modals/UploadFileModal';

function FilesSection(props){

    const {event, setModal, showModal, setShowModal} = useContext(EventContext);
    const [files, loadFiles] = useEventFiles(event.id);
    const [showUploadFileModal, setShowUploadFileModal] = useState(false);

    
    return (
        <Section>
            <Section.Header>
                <h1>Tiedostot</h1>
                <div className="group-row">
                    <input type="search" placeholder="Etsi Tiedostoja..."/>
                    <Button variant="add" className="primary" title="Lisää Tiedosto"/>
                </div>

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