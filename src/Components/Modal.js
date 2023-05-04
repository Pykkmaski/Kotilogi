function Modal(props){
    return (
        <div className="modal">
            <div className="backdrop"></div>
            <div className="body">
                {
                    props.children
                }  
            </div>
        </div>
    );
}

export default Modal;