const plusIcon = './img/plus.png';

function AddButton(props){
    return (
        <div className="d-flex flex-column align-items-center justify-content-center p-2 rounded border cursor-pointer" onClick={props.onClickHandler}>
            <div className="icon-container">
                <img src={plusIcon}/>
            </div>
            {
                props.children
            }
        </div>
    );
}

export default AddButton;