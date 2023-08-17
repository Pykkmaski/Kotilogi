
function Button(props){

    const {disabled, type, onClick, className} = props;

    if(props.variant === 'add'){
        return (
            <button className={className} onClick={onClick} type={type} disabled={disabled} id={props.id}>
                <div className="group-row">
                    <img className="inverted" src={'./img/plus.png'} width="25px"/>
                    {props.children}
                </div>
            </button>
        )
    }
    else{
        return <button className={className} onClick={onClick} disabled={disabled} id={props.id}>{props.children}</button>
    }
}

export default Button;