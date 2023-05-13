import Card from './Card';

function FileCard({file}){

    const imgSrc = './img/file.png';

    return (
        <Card>
            <Card.Image src={imgSrc}/>
            <Card.Body>
                <Card.Title>{file.title || 'Nimetön'}</Card.Title>
                <Card.Text>{file.description || 'Ei kuvausta.'}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default FileCard;