import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../scss/Houses.scss';

function Houses(props){

    const {id} = useParams();

    useEffect( () => {

    }, []);

    return (
        <div className="page management-page" id="houses-page">
            <div className="grid-item">
                <header>
                    <h1>Talot</h1>
                </header>
            </div>

            <div className="grid-item"></div>
        </div>
    );
}

export default Houses;