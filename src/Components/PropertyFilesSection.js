import UploadFile from "../Functions/UploadFile";
import AppModal from "../Modals/AppModal";
import {useState} from 'react';
import useFiles from '../Hooks/useFiles';

const { default: Gallery } = require("./Gallery");

function PropertyFilesSection({property_id}){
    const [showModal, setShowModal] = useState(false);
    const [fileIds, loadFileIds] = useFiles(property_id, null);

    return (
        <Gallery title="Tiedostot" secondaryTitle="Lisää Tiedosto" onClickHandler={() => setShowModal(true)}>
        
        {
            fileIds.map(id => {
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
                    `/properties/${property_id}/files`, 
                    () => {
                        setShowModal(false);
                        loadFileIds();
                    })
            }   
        }/>
        </Gallery>
    )
}

export default PropertyFilesSection;