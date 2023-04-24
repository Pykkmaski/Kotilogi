import axios from "axios";
import { useState } from "react";

function EditableField(props){
    const [editing, setEditing] = useState(false);
    const [unsavedContent, setUnsavedContent] = useState(props.content);

    return (
        <div className="d-flex flex-column p-1 w-100">
            <div className="editable-field-body d-flex flex-column w-100">
                {
                    editing ? 
                    <input type={props.type || 'text'} defaultValue={props.content} onChange={(e) => setUnsavedContent(e.target.value)}/> : 
                    <span>{props.content}</span>
                }
            </div>
    
            <footer className="text-align-right d-flex w-100">
                {
                    editing ? 
                    <div className="d-flex flex-row gap-1 text-align-right">
                        <a onClick={() => {setEditing(false); props.updateFunction(unsavedContent)}} className="cursor-pointer text-primary">Tallenna</a>
                        <a onClick={() => setEditing(false)} className="cursor-pointer text-secondary">Peruuta</a>
                    </div>
                     :
                    <a onClick={() => setEditing(true)} className="cursor-pointer">Muokkaa</a>
                }
            </footer>
        </div>
    );
}

export default EditableField;