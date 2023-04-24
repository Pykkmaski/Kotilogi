import AddButton from "./AddButton";

function Gallery(props){
    return (
        <div className={"gallery"}>
            <div className="gallery-header">
                <h1>{props.title}</h1>
            </div>

            <div className={"gallery-body" + ` ${props.variant}`}>
                <AddButton onClickHandler={props.onClickHandler}>
                    <span>{props.secondaryTitle}</span>
                </AddButton>
                {
                    props.children
                }
            </div>
        </div>
    )
}

export default Gallery;