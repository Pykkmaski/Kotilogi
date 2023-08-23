import Card from "./Card";
import {useContext, useState} from 'react';
import {Link} from 'react-router-dom';

import ImagesGalleryContext from "../../Contexts/ImagesGalleryContext";

export function ImageCard({image}){
    const [selected, setSelected] = useState(false);
    const {deleteImages, selectImage} = useContext(ImagesGalleryContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const cardImage = '/api/images/' + image.id;

    function checkboxHandler(e){
        console.log('Checkbox changed');
        const newState = !selected;
        setSelected(newState);
        selectImage(image.id);
    }

    return (
        <Card className={selected ? 'selected' : null}>
            <Link to={`/api/images/${image.id}`}>
                <Card.Image src={cardImage} loading="lazy"></Card.Image>
                <Card.Body>
                    <Card.Title>{image.title}</Card.Title>
                    <div className="card-text">{image.description}</div>
                </Card.Body>
            </Link>
            
            <Card.Footer>
                <input type="checkbox" onInput={checkboxHandler}></input>
                <img className="cog-img" src={'/img/settings.png'} onClick={() => setMenuOpen(!menuOpen)}></img>
            </Card.Footer>

            <Card.Menu open={menuOpen}>
                <nav>
                    <span onClick={() => deleteImages(image.id)}>Poista</span>
                </nav>
            </Card.Menu>
        </Card>
    );
}