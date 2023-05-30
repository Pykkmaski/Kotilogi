import Card from './Card';
import Button from '../Buttons/Button';

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
                    <Card.ControlLink className="primary">Muokkaa</Card.ControlLink>
                    <Card.ControlLink className="danger" onClick={() => functions.deleteFile(file)}>Poista</Card.ControlLink>
                </Card.Footer>
                :
                <></>
            }
        </Card>
    )
}

export default FileCard;