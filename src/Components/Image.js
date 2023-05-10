import useSubComponents from "../Hooks/useSubComponents";

function Image(props){

    const subComponents = useSubComponents(Object.keys(Image), props);

    return (
        <div className="image">
            <img src={props.src} loading={props.loading} onError={(e) => e.target.src = './img/no-pictures.png'}/>
            {
                subComponents.map((component) => component)
            }
        </div>
    )
}

const Controls = (props) => <div className="image-controls">{props.children}</div>
Image.Controls = Controls;

export default Image;