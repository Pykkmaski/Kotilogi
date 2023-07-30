import {useState, useEffect} from 'react';
import Button from './Button';

function EditButton(props){
    const [editing, setEditing] = useState(false);
    const [label, setLabel] = useState('Muokkaa');

    function onClickHandler(){
        setEditing(!editing);
    }

    useEffect(() => {
        if(editing){
            props.editFunction();
            console.log('Editing...');
            setLabel('Lopeta Muokkaaminen');
        }
        else{
            props.cancelFunction();
            console.log('Canceling');
            setLabel('Muokkaa');
        }
    }, [editing])

    if(props.hidden) return null;
    
    return(
        <Button className={editing ? 'secondary' : 'primary'} onClick={onClickHandler}>{label}</Button>
    )
}

export default EditButton;