import Card from './Card';

function ImageCard({image, src}){
    return (
        <Card>
            <Card.Image src={src}/>
            <Card.Body>
                <Card.Title>{image.title || image.filename}</Card.Title>
                <Card.Text>{image.description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ImageCard;