import Card from './Card';

function FileCard({file}){

    const imgSrc = './img/file.png';

    return (
        <Card>
            <Card.Image src={imgSrc}/>
            <Card.Body>
                <Card.Title>{file.title}</Card.Title>
                <Card.Text>{file.description}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default FileCard;