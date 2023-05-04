const plusIcon = './img/plus.png';

function AddButton(props){
    return (
        <div className="gallery-item add-button" onClick={props.onClickHandler}>
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