import useSubComponents from "../Hooks/useSubComponents";
import FileCard from './Cards/FileCard';
import ImageCard from "./Cards/ImageCard";

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
    <span className="button-title">{props.title}</span>
</div>
Gallery.Button = Button;

const Body = (props) => <div className="gallery-body">{props.children}</div>
Gallery.Body = Body;

const Image = (props) => <a target="blank_" href={props.src} className="gallery-item">
    <ImageCard image={props.image} src={props.src}/>
</a>

Gallery.Image = Image;

const File = (props) => <a target="_blank" className="gallery-file" href={props.url}>
    <FileCard file={props.file}/>
</a>
Gallery.File = File;

export default Gallery;