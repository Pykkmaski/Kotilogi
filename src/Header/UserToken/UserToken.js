import './Style.scss';
import {Link} from 'react-router-dom';

function UserToken({first, last}){

    return (
        <Link id="user-token" to="/user">
            <h2>
                {first[0] + last[0]}
            </h2>
        </Link>
    );
}

export default UserToken;