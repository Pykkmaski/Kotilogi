import Image from "./Image";

function EventImage(props){
    return (
        <Image src={props.src}>
            <Image.Controls>
                <button className="primary" onClick={props.setMain}>Aseta Pääkuvaksi</button>
                <button className="danger" onClick={props.delete}>Poista</button>
            </Image.Controls>
        </Image>
    );
}

export default EventImage;