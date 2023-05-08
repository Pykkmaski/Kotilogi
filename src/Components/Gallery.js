import useSubComponents from "../Hooks/useSubComponents";

function Gallery(props){
    const subComponents = useSubComponents(Object.keys(Gallery), props);

    return (
        <div className={"gallery"}>
            {
                subComponents.map((component) => component)
            }
        </div>
    )
}

const plusIcon = './img/plus.png';

const Button = (props) => <div className="gallery-item add-button" onClick={props.onClickHandler}> 
    <div className="icon-container">
        <img src={plusIcon}/>
    </div>
    {
        props.children
    }
</div>
Gallery.Button = Button;

const Body = (props) => <div className="gallery-body">{props.children}</div>
Gallery.Body = Body;

export default Gallery;