import { useEffect, useState } from "react";
import useGalleryContext from "../GalleryBase/GalleryContext";
import Link from "next/link";

export default function Card(props: GalleryBase.CardProps){
    const {state, dispatch} = useGalleryContext();
    const [isSelected, setIsSelected] = useState(state.selectedItemIds.includes(props.item.id));
    
    useEffect(() => {
        setIsSelected(state.selectedItemIds.includes(props.item.id));
    }, [state.selectedItemIds]); //This is an object. Maybe useMemo

    const imageUrl = props.imageUrl || 'public/img/not-found.jpeg';

    return (
        <div className={isSelected ? 'card selected' : 'card'} key={props.key}>
            <Link href={props.destination}>
                <div className="card-image-container">
                    <img src={imageUrl} onError={undefined}></img>
                </div>

                <div className="card-body">
                    <div className="card-header">
                        <div className="card-title">{props.item.title}</div>
                    </div>

                    <div className="card-text">
                        {props.item.description}
                    </div>
                </div>
            </Link>

            <div className="card-footer">
                <input type="checkbox" defaultChecked={isSelected} onInput={() => dispatch({type: 'select_id', value: props.item.id})}></input>
            </div>
        </div>
    );
}