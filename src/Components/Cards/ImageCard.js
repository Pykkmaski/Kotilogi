import Card from './Card';

function ImageCard({image, src}){
    return (
        <Card>
            <Card.Image src={src}/>
            <Card.Body>
                <Card.Title>{props.image.filename}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default ImageCard;