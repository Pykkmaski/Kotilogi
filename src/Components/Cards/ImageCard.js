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
                    <Card.ControlLink className="danger" onClick={() => functions.deleteImage(image.id)}>Poista</Card.ControlLink>
                    <Card.ControlLink className="primary" onClick={() => functions.editImage(image.id)}>Muokkaa</Card.ControlLink>
                    <Card.ControlLink className="primary" onClick={() => functions.setAsMain(image.id)} disabled={image.main}>Aseta Pääkuvaksi</Card.ControlLink>
                </Card.Footer>
                :
                <></>
            }
        </Card>
    )
}

export default ImageCard;