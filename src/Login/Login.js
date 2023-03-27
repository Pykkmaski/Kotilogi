import { useContext, useState, useEffect } from 'react';
import { userStorageName } from '../appconfig';
import AppContext from '../Contexts/AppContext';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import '../Login.scss';

function Login(props){

    const {user, setUser} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function submit(e){
        e.preventDefault();
        setLoading(true);

        const req = new XMLHttpRequest();
        req.open('POST', '/login', true);
        req.setRequestHeader('Content-Type', 'application/json');

        const data = {
            username : e.target.username.value,
            password: e.target.password.value,
        };
        
        req.send(JSON.stringify(data));
        req.onload = () => {
            if(req.status !== 200){
                setError(req.response);
            }
            else{
                const payload = JSON.parse(req.response);
                console.log(payload);

                setUser(payload);
                localStorage.setItem(userStorageName, JSON.stringify(payload));
                location.assign('/#/user');
            }

            setLoading(false);
        }
    }

    return (
        <div className="page" id="login-page">
            <form onSubmit={submit}>
                <h1>Kirjaudu Sisään</h1>
                <input placeholder="Käyttäjätunnus" name="username"></input>
                <input type="password" placeholder="Salasana" name="password" required={true}></input>
                <button type="submit">Kirjaudu</button>
            </form>

            {
                loading ? <>Kirjaudutaan sisään... <LoadingSpinner width="2rem" height="2rem"/></>
                :
                error === 'Invalid Username' ? <> <span className='error'>Tiliä antamallasi käyttäjänimellä ei ole!</span></>
                : 
                error === 'Invalid Password' ? <><span className="error">Antamasi salasana on virheellinen!</span></>
                : 
                null
            }
        </div>
    );
}

export default Login;