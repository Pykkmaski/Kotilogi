import upload from "kotilogi-app/actions/upload";
import Button from "kotilogi-app/components/Button/Button";
import FileDropZone from "kotilogi-app/components/FileDropZone/FileDropZone";
import Form from "kotilogi-app/components/Form";
import Modal, { ModalProps } from "kotilogi-app/components/Modals/Modal";
import { useState } from "react";
import toast from "react-hot-toast";
import useGalleryContext from "../GalleryBase/GalleryContext";

export default function AddFilesModal(props: ModalProps & {
    title: string,
    fileType: Kotilogi.MimeType,
    id: string,
    item: {id: Kotilogi.IdType},
}){
    const [loading, setLoading] = useState(false);
    const {dispatch} = useGalleryContext();

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
                data.append('refId', props.item.id);
                const res = await upload(data);
                if(res){
                    numSuccessfulUploads++;
                    dispatch({
                        type: 'add_data',
                        value: res,
                    });
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

            setLoading(false);
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