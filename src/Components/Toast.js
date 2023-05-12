import useSubComponents from "../Hooks/useSubComponents";

function Toast(props){

    const subComponents = useSubComponents(Object.keys(Toast), props);

    return (
        <div className="toast">
            {
                subComponents.map(component => component)
            }
        </div>
    );
}

const Header = (props) => <div className="toast-header">{props.children}</div>
Toast.Header = Header;

const Body = (props) => <div className="toast-header">{props.children}</div>
Toast.Body = Body;

export default Toast;