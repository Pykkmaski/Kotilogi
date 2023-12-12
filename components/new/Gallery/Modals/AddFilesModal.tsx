import upload from "kotilogi-app/actions/upload";
import Button from "kotilogi-app/components/Button/Button";
import FileDropZone from "kotilogi-app/components/FileDropZone/FileDropZone";
import Form from "kotilogi-app/components/Form";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useState } from "react";
import toast from "react-hot-toast";
import useGalleryContext from "../GalleryBase/GalleryContext";
import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";

export default function AddFilesModal(props: ModalProps & {
    title: string,
    fileType: Kotilogi.MimeType,
    id: string,

    /**
     * The id of the target this file shall belong to.
     */
    refId: Kotilogi.IdType,
}){
    const [loading, setLoading] = useState(false);
    const {dispatch, props: {tableName}} = useGalleryContext();

    var files: File[] = [];

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        var numSuccessfulUploads = 0;
        const numFilesToUpload = files.length;

        try{
            for(const file of files){
                const data = new FormData();
                data.append('file', file);
                data.append('refId', props.refId);
                const res = await upload(data, tableName as 'propertyFiles' | 'eventFiles');
                
                if(res){
                    numSuccessfulUploads++;
                }
                else{
                    toast.error(
                        `Tiedoston ${file.name} lataaminen epäonnistui!`
                    );
                }
            }

            files = [];
        }
        catch(err){
            console.log(err.message);
        }
        finally{
            toast.success(
                `${numSuccessfulUploads}/${numFilesToUpload} Tiedostoa lähetetty onnistuneesti!`
            );
            
            const path = (
                tableName === 'properties' ? `/auth/properties/new/[property_id]`
                :
                `/auth/events/[event_id]`
            );

            await serverRevalidatePath(path);
            
            setLoading(false);
            props.onHide();

        }
        
    }

    const formId = `form-${props.id}`;

    return (
        <Modal show={props.show} onHide={props.onHide} id={props.id}>
            <Modal.Header>{props.title}</Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmitHandler} id={formId}> 
                    <FileDropZone
                        name="file"
                        accept={props.fileType}
                        form={formId}
                        onFileUploaded={(newFiles: File[]) => {
                            files = newFiles;
                        }}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    className="secondary"
                    desktopText="Peruuta"
                    onClick={props.onHide}
                    disabled={loading}
                />

                <Button
                    className="primary"
                    desktopText="Lähetä"
                    type="submit"
                    disabled={loading}
                    loading={loading}
                    form={formId}
                />
            </Modal.Footer>
        </Modal>
    )
}