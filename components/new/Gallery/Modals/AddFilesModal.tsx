import {upload} from "kotilogi-app/actions/file/upload";
import Button from "kotilogi-app/components/Button/Button";
import FileDropZone from "kotilogi-app/components/FileDropZone/FileDropZone";
import Form from "kotilogi-app/components/Form/Form";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useState } from "react";
import toast from "react-hot-toast";
import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";
import { useGalleryContext } from "../GalleryBase/Gallery";

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
    const {props: {tableName}} = useGalleryContext();
    const [files, setFiles] = useState<File[]>([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        var numSuccessfulUploads = 0;
        const numFilesToUpload = files.length;

        try{
            /**
             * The array of form data to send to the server.
             */
            const dataArray: FormData[] = [];

            for(const file of files){
                const data = new FormData();
                data.append('file', file);
                data.append('refId', props.refId);
                dataArray.push(data);
            }

            const res = await upload(dataArray, tableName as 'propertyFiles' | 'eventFiles');
                
            if(!res){
                throw new Error('Tiedostojen lähetys epäonnistui!');
            }

            numSuccessfulUploads = res.length;

            const path = (
                tableName === 'properties' ? `/auth/properties/new/[property_id]`
                :
                `/auth/events/[event_id]`
            );
            
            await serverRevalidatePath(path);
            toast.success(
                `${numSuccessfulUploads}/${numFilesToUpload} Tiedostoa lähetetty onnistuneesti!`,
            );
        }
        catch(err){
            console.log(err.message);
            toast.error(err.message);
        }
        finally{
            setFiles([]);
            
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
                            setFiles(newFiles);
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
                    disabled={loading || files.length == 0}
                    loading={loading}
                    form={formId}
                />
            </Modal.Footer>
        </Modal>
    )
}