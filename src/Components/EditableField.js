import { useState } from "react";

function ButtonGroup({editing, setEditing}){
    return (
        <div className="button-group">
            <button className="primary" onClick={() => setEditing(true)}>Muokkaa</button>
            {
                editing
                ?
                <button className="secondary" onClick={() => setEditing(false)}>Peruuta</button>
                :
                null
            }
        </div>
    )
}

function EditableField(props){
    return(
        <div className="component-editablefield">
            <h2>{props.label}</h2>
            <input 
                type={props.inputType || 'text'}
                defaultValue={props.defaultValue} 
                disabled={!props.editing}
                onChange={props.onChange}
            />
        </div>
    )
}

export default EditableField;