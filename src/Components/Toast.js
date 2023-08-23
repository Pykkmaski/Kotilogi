import useSubComponents from "../Hooks/useSubComponents";
import {useState, useEffect, useRef} from 'react';

function Toast(props){

    const [show, setShow] = useState(props.show);
    const subComponents = useSubComponents(Object.keys(Toast), props);
    const originalClassList = useRef((['toast'].concat(props.className?.split(' ')).join(' ')));
    const [classList, setClassList] = useState(originalClassList.current);

    const element = (
        <div className={classList}>
            {
                subComponents.map(component => component)
            }
        </div>
    );

    useEffect(() => {
        if(show === true){
            const newList = [...classList, 'show'].join(' ');
            setClassList(newList);
        }
        else{
            setClassList(originalClassList.current);
        }
    }, [show]);


    return element;
}

const Header = (props) => <div className="toast-header">{props.children}</div>
Toast.Header = Header;

const Body = (props) => <div className="toast-body">{props.children}</div>
Toast.Body = Body;

export default Toast;