import {useContext} from 'react';
import EventContext from '../../Contexts/EventContext';
import useEventFiles from '../../Hooks/useEventFiles';
import Section from '../../Components/Section';
import Gallery from '../../Components/Gallery';

function FilesSection(props){

    const {event} = useContext(EventContext);
    const [files, loadFiles] = useEventFiles(event.id);

    return (
        <Section>
            <Section.Header>
                <h1>Tiedostot</h1>
            </Section.Header>
            
            <Section.Body>
                <Gallery>
                    <Gallery.Body>
                        <Gallery.Button title="Lisää Tiedosto"/>
                    </Gallery.Body>
                </Gallery>
            </Section.Body>
        </Section>
    )
}

export default FilesSection;