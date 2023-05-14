import useSubComponents from "../Hooks/useSubComponents";
import useClassName from '../Hooks/useClassName';

function Image(props){

    const subComponents = useSubComponents(Object.keys(Image), props);
    const className = useClassName('image', props.className);

    return (
        <div className={className}>
            <img src={props.src} loading={props.loading} onError={(e) => e.target.src = './img/no-pictures.png'} onClick={props.onClick}/>
            {
                subComponents.map((component) => component)
            }
        </div>
    )
}

const Controls = (props) => <div className="image-controls">{props.children}</div>
Image.Controls = Controls;

export default Image;