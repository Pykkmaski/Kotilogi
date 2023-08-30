import Image from "./Image";

function EventImage(props){
    return (
        <Image src={props.src}>
            <Image.Controls>
                <button className="danger" onClick={props.delete}>Poista</button>
            </Image.Controls>
        </Image>
    );
}

export default EventImage;