import { useState } from "react";

function Dropdown(props){
    const [isOpen, setIsOpen] = useState(false);

    function toggle(){
        setIsOpen(!isOpen);
    }

    return (
        <div className="dropdown">
            <div className="dropdown-title" onClick={toggle}>{props.title}</div>

            {
                isOpen ? <div className="dropdown-body">{ props.children } </div> : null
            }
            
        </div>
    );
}

export default Dropdown;