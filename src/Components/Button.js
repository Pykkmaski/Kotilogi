function Button(props){
    if(props.variant === 'add'){
        return (
            <button className={props.className} onClick={props.onClick} type={props.type}>
                <div className="group-row">
                    <img className="inverted" src={'./img/plus.png'} width="25px"/>
                    {props.children}
                </div>
            </button>
        )
    }
    else{
        return <button className={props.className} onClick={props.onClick}>{props.title}</button>
    }
}

export default Button;