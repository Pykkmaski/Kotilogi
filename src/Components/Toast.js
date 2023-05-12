import useSubComponents from "../Hooks/useSubComponents";
import {useState, useEffect} from 'react';

function Toast(props){

    const [show, setShow] = useState(props.show);
    const subComponents = useSubComponents(Object.keys(Toast), props);

    const classList = ['toast'].concat(props.className?.split(' ')).join(' ');

    console.log(classList);
    return (
        <div className={'toast'}>
            {
                subComponents.map(component => component)
            }
        </div>
    )
}

const Header = (props) => <div className="toast-header">{props.children}</div>
Toast.Header = Header;

const Body = (props) => <div className="toast-body">{props.children}</div>
Toast.Body = Body;

export default Toast;