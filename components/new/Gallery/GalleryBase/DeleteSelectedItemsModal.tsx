import { CloseButton } from '@/components/CloseButton';
import {default as ExperimentalModal, ModalRefType} from '@/components/Experimental/Modal/Modal';
import { useDeleteDataModal } from '../../../Experimental/Modal/Modal.hooks';
import Button from '@/components/Button/Button';
import { useGalleryContext } from '@/components/new/Gallery/GalleryBase/Gallery';
import { forwardRef } from 'react';

type DeleteSelectedItemsModalProps = {
    deleteMethod: Function;
}

function DeleteSelectedItemsModal({deleteMethod}: DeleteSelectedItemsModalProps, ref: React.MutableRefObject<ModalRefType>){
    const {state, dispatch} = useGalleryContext();
    const {status, executeDelete} = useDeleteDataModal(ref, deleteMethod, state.selectedItems);
    const loading = status === 'loading';
    
    const deleteItems = () => {
        executeDelete();
        dispatch({
            type: 'reset_selected',
        });
    }

    return (
        <ExperimentalModal ref={ref}>
            <ExperimentalModal.Header>
                <h1 className="text-xl text-slate-500">Poista Valitut Kohteet</h1>
                <ExperimentalModal.CloseTrigger>
                    <CloseButton/>
                </ExperimentalModal.CloseTrigger>
            </ExperimentalModal.Header>

            <ExperimentalModal.Body>
                <div className="flex flex-col gap-4 md:w-[700px] xs:w-full">
                    <p className="text-slate-500">
                        Olet poistamassa seuraavia kohteita:
                    </p>
                    <ul className="text-slate-500">
                        {
                            state.selectedItems.map(item => (
                                <li className="font-semibold">{item.title}</li>
                            ))
                        }
                    </ul>
                </div>
            </ExperimentalModal.Body>

            <ExperimentalModal.Footer>
                <ExperimentalModal.CloseTrigger>
                    <Button variant="secondary" disabled={loading}>
                        <span>Peruuta</span>
                    </Button>
                </ExperimentalModal.CloseTrigger>

                <Button variant="primary-dashboard" disabled={loading} loading={loading} onClick={deleteItems}>
                    <span className="mx-8">Poista</span>
                </Button>
            </ExperimentalModal.Footer>
        </ExperimentalModal>
        /*
        <DeleteModal2 
            {...props} 
            targetsToDelete={state.selectedItems} 

            deleteMethod={deleteMethod}

            resetSelectedTargets={() => dispatch({
                type: 'reset_selected',
            })}/>
            */
    );
}

export default forwardRef(DeleteSelectedItemsModal);