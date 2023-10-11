import Modal from 'kotilogi-app/components/Modals/Modal';
import { useChartSelectorContext } from '../../../ChartSelector/ChartSelectorContext';
import style from './style.module.scss';
import { useState } from "react";
import Form from 'kotilogi-app/components/Form';
import serverUpdateDataById from 'kotilogi-app/actions/serverUpdateDataById';
import serverRevalidatePath from 'kotilogi-app/actions/serverRevalidatePath';
import toast from 'react-hot-toast';
import Button from 'kotilogi-app/components/Button/Button';

type ChartEntryProps = {
    data: Kotilogi.UsageType,
    id: string,
}

type SettingsButtonProps = {

}

function SettingsButton(props: SettingsButtonProps){
    const [open, setOpen] = useState(false);

    const dotClassName = open ? `settingsButtonDot open` : "settingsButtonDot";

    return (
        <div className={style.settingsButton} onClick={() => setOpen(prev => !prev)}>
            <div className={dotClassName}></div>
            <div className={dotClassName}></div>
            <div className={dotClassName}></div>
        </div>
    )
}

export default function ChartEntry(props: ChartEntryProps){
    const {state, dispatch} = useChartSelectorContext();
    const [loading, setLoading] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [currentData, setCurrentData] = useState({
        ...props.data
    });

    const onChangeHandler = (e) => {
        dispatch({
            type: 'toggle_selected',
            value: props.data.id,
        });
    }

    const onDataChangeHandler = (e) => {
        setCurrentData(prev => {
            return {
                ...prev,
                [e.target.name] : e.target.value,
            }
        });
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try{
            setLoading(true);
            const updatedData = await serverUpdateDataById(currentData, props.data.id, 'usage') as any;
            if(!updatedData) throw new Error('Failed to update update usage data entry!');
            setCurrentData(updatedData);
            toast.success('Tiedon päivitys onnistui!');
        }
        catch(err){
            toast.error('Tiedon päivitys epäonnistui!');
        }
        finally{
            setLoading(false);
            setShowModal(false);
        }
    }

    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)} id={`usage-entry-modal-${props.id}`}>
                <Modal.Header>Muokkaa</Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group>
                            <label>Hinta</label>
                            <input type="number" name="price" defaultValue={currentData.price} required onChange={onDataChangeHandler}/>
                        </Form.Group>

                        <Form.Group>
                            <label>Päiväys</label>
                            <input type="date" name="time" defaultValue={currentData.time} required onChange={onDataChangeHandler}/>
                        </Form.Group>

                        <Form.ButtonGroup>
                            <Button 
                                desktopText={'Peruuta'}  
                                className="secondary"
                                onClick={() => setShowModal(false)}   
                                disabled={loading}                           
                            />
                            
                            <Button
                                desktopText='Päivitä'
                                className="primary"
                                type="submit"
                                disabled={loading}
                                loading={loading}
                            />
                        </Form.ButtonGroup>
                    </Form>
                </Modal.Body>
            </Modal>

            <div className={style.chartEntry}>
                <div onClick={() => setShowModal(true)} className={style.dataContainer}>
                    <span>Päiväys: {new Date(currentData.time).toLocaleDateString('fi-Fi')}</span>
                    <span>Hinta: {currentData.price + '€'}</span>
                </div>
                
                <input type="checkbox" onChange={onChangeHandler}></input>
            </div>
        </>
        
    )
}