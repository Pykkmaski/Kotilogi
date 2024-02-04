import PrimaryButton from "../Button/PrimaryButton";
import SecondaryButton from "../Button/SecondaryButton";
import { Group } from "../Group";
import { useStatus } from "./BaseAddModal.hooks";
import Modal, { ModalProps } from "./Modal";

export type DeleteModalProps<T> = ModalProps & {
    targetsToDelete: T[],
    resetSelectedTargets: () => void, 
    deleteMethod: (id: string) => Promise<void>,
};

export function DeleteModal<T extends Kotilogi.ItemType>({targetsToDelete, resetSelectedTargets, deleteMethod, ...props}: DeleteModalProps<T>){

    const [status, setStatus] = useStatus('idle');

    const deleteItems = async () => {
        setStatus('loading');
        try{
            for(const item of targetsToDelete){
                await deleteMethod(item.id);
            }
            setStatus('success');
            resetSelectedTargets();
            props.onHide();
        }
        catch(err){
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
                <Group direction="vertical">
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
                    desktopText="Ei" 
                    disabled={loading}
                    onClick={cancelDelete}/>

                <SecondaryButton 
                    desktopText="Kyllä" 
                    loading={loading}
                    disabled={loading}
                    onClick={deleteItems}/>
            </Modal.Footer> 
        </Modal>
    )
}