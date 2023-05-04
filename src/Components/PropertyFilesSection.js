import UploadFile from "../Functions/UploadFile";
import AppModal from "../Modals/AppModal";
import {useState} from 'react';
import usePropertyFiles from '../Hooks/usePropertyFiles';

const { default: Gallery } = require("./Gallery");

function PropertyFilesSection({property_id}){
    const [showModal, setShowModal] = useState(false);
    const [files, loadFiles] = usePropertyFiles(property_id);

    return (
        <Gallery title="Tiedostot" buttonTitle="Lisää Tiedosto" onClickHandler={() => setShowModal(true)}>
        
        {
            files.map(id => {
                return (
                    <img src={'/'} width="200px" key={`property-${property_id}-file-${id}`}/>
                )
            })
        }
        
        <AppModal variant="upload/pdf" setShowModal={setShowModal} showModal={showModal} uploadFunction={
            (e) => {
                e.preventDefault();
                UploadFile(
                    e.target.pdf.files[0], 
                    'file', 
                    `/api/files/properties/${property_id}`, 
                    () => {
                        setShowModal(false);
                        loadFiles();
                    })
            }   
        }/>
        </Gallery>
    )
}

export default PropertyFilesSection;