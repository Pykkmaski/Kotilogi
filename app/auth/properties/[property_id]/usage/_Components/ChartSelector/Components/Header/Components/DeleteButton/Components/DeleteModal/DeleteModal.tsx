"use client";

import { serverAddData } from "kotilogi-app/actions/serverAddData";
import { useChartSelectorContext } from "../../../../../../ChartSelectorContext";
import Modal from "kotilogi-app/components/Modals/Modal";
import Form from "kotilogi-app/components/Form/Form";
import Button from "kotilogi-app/components/Button/Button";
import { serverDeleteDataByIds } from "kotilogi-app/actions/serverDeleteDataByIds";
import { serverGetDataByRefId } from "kotilogi-app/actions/serverGetData";
import toast from "react-hot-toast";
import { useState } from "react";
import serverRevalidatePath from "kotilogi-app/actions/serverRevalidatePath";

export default function DeleteModal(){
    const {state, dispatch} = useChartSelectorContext();

    const onDeleteHandler = async () => {
        try{
            dispatch({
                type: 'toggle_loading',
                value: true,
            });

            const deletionResult = await serverDeleteDataByIds(state.selectedItems, 'usage');
            if(!deletionResult) throw new Error('Usage Delete Modal onDeleteHandler: Failed to delete usage data!');

            const newData = await serverGetDataByRefId(state.propertyId, 'usage');
            if(!newData) throw new Error('Usage Delete Modal onDeleteHandler: Failed to get current data after deletion!');
           
            console.log(newData);
            
            dispatch({
                type: 'set_data',
                value: newData,
            });
            
            toast.success('Tiedon poisto onnistui!');
        }
        catch(err){
            console.log(err.message);
            toast.error('Tiedon poisto epäonnistui!');
        }
        finally{
            dispatch({
                type: 'toggle_delete_modal',
                value: false,
            });

            dispatch({
                type: 'toggle_loading',
                value: false,
            });

            dispatch({
                type: 'reset_selected',
                value: null,
            });
        }
    }

    return (
        <Modal show={state.showDeleteModal} onHide={() => dispatch({type: 'toggle_delete_modal', value: false})} id={'usage-delete-modal'}>
            <Modal.Header>Poista Tieto</Modal.Header>
            <Modal.Body>
                <span>Haluatko varmasti poistaa valitsemasi tiedot?</span>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    desktopText={"Peruuta"} 
                    className="primary"
                    disabled={state.isLoading} 
                    onClick={() => dispatch({
                        type: 'toggle_delete_modal',
                        value: false,
                    })}
                />

                <Button 
                    desktopText={"Poista"} 
                    className="secondary"
                    disabled={state.isLoading} 
                    loading={state.isLoading} 
                    onClick={onDeleteHandler}
                />
            </Modal.Footer>
        </Modal>
    )
}