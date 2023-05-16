import {useState} from 'react';
import Button from './Button';

function EditButton(props){
    const [editing, setEditing] = useState(false);

    function onClickHandler(){
        setEditing(!editing);
        if(editing){
            props.editingFunction();
        }
        else{
            props.cancelFunction();
        }
    }

    return(
        <Button className={editing ? 'secondary' : 'primary'} onClick={onClickHandler}>{props.children}</Button>
    )
}

export default EditButton;