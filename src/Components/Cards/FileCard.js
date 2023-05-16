import Card from './Card';

function FileCard({file, editing, functions}){

    const imgSrc = './img/file.png';

    return (
        <Card>
            <Card.Image src={imgSrc}/>
            <Card.Body>
                <Card.Title>{file.title || file.filename}</Card.Title>
                <Card.Text>{file.description || 'Ei kuvausta.'}</Card.Text>
            </Card.Body>

            {
                editing ? 
                <Card.Footer>
                    <Button className="danger" onClick={() => functions.deleteFile(file.id)}>Poista</Button>
                </Card.Footer>
                :
                <></>
            }
        </Card>
    )
}

export default FileCard;