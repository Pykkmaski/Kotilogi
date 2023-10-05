"use client";

import { serverAddData } from "kotilogi-app/actions/serverAddData";
import { useChartSelectorContext } from "../../../../../../ChartSelectorContext";
import Modal from "kotilogi-app/components/Modals/Modal";
import Form from "kotilogi-app/components/Form";
import Button from "kotilogi-app/components/Button/Button";

export default function DeleteModal(){
    const {state, dispatch} = useChartSelectorContext();
    
    return (
        <Modal show={state.showDeleteModal} onHide={() => dispatch({type: 'toggle_delete_modal', value: false})} id={'usage-delete-modal'}>
            <Modal.Header>Poista Tieto</Modal.Header>
            <Modal.Body>
                <span>Haluatko varmasti poistaa valitsemasi tiedot?</span>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    desktopText={"Peruuta"} 
                    disabled={state.loading} 
                    onClick={() => dispatch({
                        type: 'toggle_delete_modal',
                        value: false,
                    })}
                />

                <Button desktopText={"Poista"} disabled={state.loading} loading={state.loading} onClick={() => dispatch({
                    type: 'delete_selected',
                    value: null,
                })}/>
            </Modal.Footer>
        </Modal>
    )
}