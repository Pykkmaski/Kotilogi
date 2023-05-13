import Card from './Card';

function FileCard({file}){

    const imgSrc = './img/file.png';

    return (
        <Card>
            <Card.Image src={imgSrc}/>
            <Card.Body>
                <Card.Title>{file.filename}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default FileCard;