"use client";

import { serverAddData } from "kotilogi-app/actions/serverAddData";
import { useChartSelectorContext } from "../../../../../../ChartSelectorContext";
import Modal from "kotilogi-app/components/Modals/Modal";
import Form from "kotilogi-app/components/Form";
import Button from "kotilogi-app/components/Button/Button";

export default function AddModal(){
    const {state, dispatch} = useChartSelectorContext();

    const onSubmitHandler = async (e: any) => {
        e.preventDefault();
        try{
            const currentSection = state?.selectedSection;
            const data = {
                time: new Date(e.target.time.value).getTime(),
                price: e.target.price.valueAsNumber,
                refId: state.propertyId,
                type: currentSection,
            }
            const insertedData = await serverAddData(data, 'usage');
            if(!insertedData) throw new Error('Failed to add data!');

            dispatch({type: 'add_data', value: insertedData});
        }
        catch(err){
            console.log(err.message);
        }
        finally{
            dispatch({type: 'toggle_add_modal', value: false});
        }
        
    }

    return (
        <Modal show={state.showAddModal} onHide={() => dispatch({type: 'toggle_add_modal', value: false})} id={'usage-add-modal'}>
            <Modal.Header>Lisää Tieto</Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group>
                        <label>Hinta</label>
                        <input type="number" min="0.01" step="0.01" name="price"/>
                    </Form.Group>

                    <Form.Group>
                        <label>Päiväys</label>
                        <input type="date" name="time"/>
                    </Form.Group>
                    
                    <Form.ButtonGroup>
                        <Button 
                            className="secondary"
                            desktopText='Peruuta'
                            onClick={() => dispatch({
                                type: 'toggle_add_modal',
                                value: false,
                            })}
                            disabled={state.isLoading}
                        />

                        <Button 
                            className="primary"
                            desktopText='Lähetä'
                            type="submit"
                            disabled={state.isLoading}
                            loading={state.isLoading}
                        />
                    </Form.ButtonGroup>
                </Form>
            </Modal.Body>
        </Modal>
    )
}