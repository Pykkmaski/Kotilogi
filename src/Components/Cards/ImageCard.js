import Card from './Card';

function ImageCard({image, src, editing, functions}){
    return (
        <Card>
            <Card.Image src={src}/>
            <Card.Body>
                <Card.Title>{image.title || image.filename}</Card.Title>
                <Card.Text>{image.description || 'Ei Kuvausta.'}</Card.Text>
            </Card.Body>

            {
                editing ? 
                <Card.Footer>
                    <Button className="danger" onClick={() => functions.deleteImage(image.id)}>Poista</Button>
                    <Button className="primary" onClick={() => functions.setImageAsMain(image.id)} disabled={image.main}>Aseta Pääkuvaksi</Button>
                </Card.Footer>
                :
                <></>
            }
        </Card>
    )
}

export default ImageCard;