import useSubComponents from "../Hooks/useSubComponents";
import useClassName from '../Hooks/useClassName';
import {useImage} from 'react-image';
import { Suspense } from "react";
import LoadingSpinner from "./Spinner";

function ReactImage(props){
    const {src} = useImage({
        srcList: [props.src, './img/no-pictures.png'],
    })

    return <img src={src} onClick={props.onClick}/>
}

function Image(props){

    const subComponents = useSubComponents(Object.keys(Image), props);
    const {className} = useClassName('image', props.className);

    return (
        <div className={className}>
            <Suspense fallback={<LoadingSpinner size="2rem"/>}>
                <ReactImage src={props.src} onClick={props.onClick}/>
            </Suspense>
           

            {
                subComponents.map((component) => component)
            }
        </div>
    )
}

const Controls = (props) => <div className="image-controls">{props.children}</div>
Image.Controls = Controls;

export default Image;