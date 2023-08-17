import useClassName from "../../Hooks/useClassName";
import useSubComponents from "../../Hooks/useSubComponents";

function Gallery(props){
    const {className} = useClassName('gallery', props.className);
    const subComponents = useSubComponents(Object.keys(Gallery), props);

    return (
        <div className={className}>
            {
                props.children
            }
        </div>
    )
}

const plusIcon = './img/plus.png';

const Button = (props) => <div className="gallery-item add-button" onClick={props.onClickHandler}> 
    <div className="icon-container">
        <img src={plusIcon}/>
    </div>
    <span className="button-title">{props.title}</span>
</div>
Gallery.Button = Button;

const Body = (props) => {
    const {className} = useClassName('gallery-body', props.className);
    return (
        <div className={className}>{props.children}</div>
    );
}
Gallery.Body = Body;

const Header = (props) => {
    const {className} = useClassName('gallery-header', props.className);
    return (
        <div className={className} id={props.id}>{props.children}</div>
    )
}
Gallery.Header = Header;

export default Gallery;