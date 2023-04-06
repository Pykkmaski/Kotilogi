import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Style.scss';

function Houses(props){

    const [properties, setProperties] = useState([]);
    const {user} = useContext(AppContext);
    const {id} = useParams();

    useEffect(() => {
        if(!user) return;
        const req = new XMLHttpRequest();
        req.open('GET', `/property/all/${user.username}`, true);
        req.setRequestHeader('Auth', user.token);
        req.send();

        req.onload = () => {
            if(req.status === 200){
                const newProperties = JSON.parse(req.response);
                setProperties(newProperties);
            }
            else{
                console.log(req.response);
            }
        }
    }, [user]);

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