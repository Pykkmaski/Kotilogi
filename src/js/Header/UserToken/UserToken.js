import './Style.scss';
import {Link} from 'react-router-dom';

function UserToken({first, last, onClick}){

    return (
        <div id="user-token" onClick={onClick}>
            <h2>
                {first[0] + last[0]}
            </h2>
        </div>
    );
}

export default UserToken;