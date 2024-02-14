import toast from "react-hot-toast";
import {PrimaryButton} from "../Button/PrimaryButton";
import {SecondaryButton} from "../Button/SecondaryButton";
import { Group } from "../Group";
import { useStatus } from "./BaseAddModal.hooks";
import Modal, { ModalProps } from "./Modal";

export type DeleteModalProps<T extends Kotilogi.ItemType> = ModalProps & {
    targetsToDelete: T[],
    resetSelectedTargets: () => void, 
    deleteMethod: (item: T) => Promise<void>,
};

export function DeleteModal<T extends Kotilogi.ItemType>({targetsToDelete, resetSelectedTargets, deleteMethod, ...props}: DeleteModalProps<T>){

    const [status, setStatus] = useStatus('idle');

    const deleteItems = async () => {
        setStatus('loading');
        try{
            const promises: Promise<void>[] = [];
            for(const item of targetsToDelete){
                promises.push(deleteMethod(item));
            }

            await Promise.all(promises);
            
            setStatus('success');
            resetSelectedTargets();
            props.onHide();
        }
        catch(err){
            toast.error(err.message);
            setStatus('error');
        }
    }

    const cancelDelete = () => {
        resetSelectedTargets();
        props.onHide();
    }

    const loading = status === 'loading';

    return (
        <Modal {...props}>
            <Modal.Header>Poista</Modal.Header>
            <Modal.Body>
                <Group direction="col">
                    <p>
                        Olet poistamassa seuraavia kohteita:
                    </p>
                    <ul>
                        {
                            targetsToDelete.map(target => {
                                const content = target.title;
                                return <li>{content}</li>
                            })
                        }
                    </ul>

                    <p>
                        Oletko varma?
                    </p>
                </Group>
            </Modal.Body>
            <Modal.Footer>
                <PrimaryButton 
                    disabled={loading}
                    onClick={cancelDelete}>Ei</PrimaryButton>

                <SecondaryButton 
                    loading={loading}
                    disabled={loading}
                    onClick={deleteItems}>Kyllä</SecondaryButton>
            </Modal.Footer> 
        </Modal>
    )
}