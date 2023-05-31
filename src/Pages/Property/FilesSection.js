import {useContext, useState, useRef} from 'react';
import usePropertyFiles from '../../Hooks/usePropertyFiles';
import PropertyContext from "../../Contexts/PropertyContext";
import FileSection from '../../Components/FilesSection';

function FilesSection(props){
    const {property, loadProperty} = useContext(PropertyContext);
    const [files, loadFiles] = usePropertyFiles(property.id);

    return (
        <FileSection 
            target={property}
            loadTarget={loadProperty}
            files={files}
            loadFiles={loadFiles}
            baseUrl={'/api/files/properties'}
        />
    )
}

export default FilesSection;