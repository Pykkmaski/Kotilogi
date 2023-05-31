import {useContext, useState, useRef} from 'react';
import EventContext from '../../Contexts/EventContext';
import useEventFiles from '../../Hooks/useEventFiles';
import FileSection from '../../Components/FilesSection';

function FilesSection(props){

    const {event} = useContext(EventContext);
    const [files, loadFiles] = useEventFiles(event.id);

    return (
        <FileSection 
            target={event}
            files={files}
            loadFiles={loadFiles}
            baseUrl={'/api/files/events'}
        />
    );
}

export default FilesSection;