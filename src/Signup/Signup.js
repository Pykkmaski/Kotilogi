import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function Signup(props){

    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState('');

    function submit(e){
        e.preventDefault();
        setIsRegistering(true);

        const req = new XMLHttpRequest();
        req.open('POST', '/signup', true);
        req.setRequestHeader('Content-Type', 'application/json');
        const data = {
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            username: e.target.username.value,
            password1: e.target.password1.value,
            password2: e.target.password2.value,
        };

        req.send(JSON.stringify(data));

        req.onload = () => {
            if(req.status === 200){
                location.assign('/#/thankyou');
            }
            else{
                setIsRegistering(false);
                setError(req.response);
            }
        }
    }

    return (
        <div className="page" id="signup-page">
            <form id="signup-form" onSubmit={submit}>
                <h1>Luo Tili</h1>
                <input name="first_name" placeholder="Etunimi"></input>
                <input name="last_name" placeholder="Sukunimi"></input>
                <input name="username" type="text" placeholder="Käyttäjätunnus" required={true}></input>
                <input name="password1" type="password" placeholder="Salasana" required={true} autoComplete="new-password"></input>
                <input name="password2" type="password" placeholder="Anna Salasana Uudelleen" required={true} autoComplete="new-password"></input>
                <button type="submit">Luo Tili</button>
            </form>

            {
                isRegistering ? <> Tiliä luodaan. Ole hyvä ja odota. <LoadingSpinner width={'2rem'} height={'2rem'}/></>
                :
                error === 'Invalid Username' ? <span className="error">Tili antamallasi käyttäjänimellä on jo olemassa!</span>
                :
                error === 'Invalid Password' ? <span className="error">Antamasi salasanat eivät täsmää!</span>
                :
                null
            }
        </div>
    )
}

export default Signup;