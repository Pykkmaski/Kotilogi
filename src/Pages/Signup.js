import { useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../Components/Spinner';

function Signup(props){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(0);

    function onSubmitHandler(e){
        e.preventDefault();
        setLoading(true);
        setError(0);

        axios.post('/api/signup', {
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            password1: e.target.password1.value,
            password2: e.target.password2.value,
        })
        .then(res => {
            location.assign('/#/thankyou');
        })
        .catch(err => {
            setError(err.response.status);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    /*
    <Form onSubmit={onSubmitHandler}>
                <header>
                    <h1>Luo Käyttäjätunnus</h1>
                </header>
                <Form.Group className="w-100">
                    <Form.Label>Etunimi</Form.Label>
                    <Form.Control type="text" required name="first_name"></Form.Control>
                </Form.Group>

                <Form.Group className="w-100">
                    <Form.Label>Sukunimi</Form.Label>
                    <Form.Control type="text" required name="last_name"></Form.Control>
                </Form.Group>

                <Form.Group className="w-100">
                    <Form.Label>Sähköposti</Form.Label>
                    <Form.Control type="text" required name="email"></Form.Control>
                </Form.Group>

                <Form.Group className="w-100">
                    <Form.Label>Salasana</Form.Label>
                    <Form.Control type="password" required name="password1" minLength={8} controlId="formBasicPassword"></Form.Control>
                    <Form.Text>Salasanan tulee olla vähintään 8 merkkiä pitkä.</Form.Text>
                </Form.Group>

                <Form.Group className="w-100">
                    <Form.Label>Anna Salasana Uudelleen</Form.Label>
                    <Form.Control type="password" required name="password2"></Form.Control>
                </Form.Group>

                <Button variant="primary" size="lg" type="submit">Luo Tili</Button>

                {
                    loading ? <Spinner role="status" animation="grow"></Spinner> : null
                }

                <span className="text-danger">
                    {
                        error === 409 ? 
                        "Annetut salasanat eivät täsmää!" :
                        error === 406 ?
                        "Tili annetulla käyttäjänimellä on jo olemassa!" :
                        null
                    }
                </span>
            </Form>

        */

    return (
        <div id="signup-page">
            <div className="bg-blur"></div>
            <form onSubmit={onSubmitHandler} className="animated">
                <div className="form-title">Luo Tili</div>

                <div className="form-group">
                    <label>Etunimi</label>
                    <input name="first_name" required/>
                </div>

                <div className="form-group">
                    <label>Sukunimi</label>
                    <input name="last_name" required/>
                </div>

                <div className="form-group">
                    <label>Sähköpostiosoite</label>
                    <input type="email" required name="email" className={error === 406 ? 'error' : ''}/>
                </div>

                <div className="form-group">
                    <label>Salasana</label>
                    <input type="password" minLength={8} required name="password1" className={error === 409 ? 'error' : ''}/>
                    <div className="sub-label">Salasanan tulee olla vähintään 8 merkkiä pitkä.</div>
                </div>

                <div className="form-group">
                    <label>Kirjoita Salasana Uudelleen</label>
                    <input type="password" required name="password2" className={error === 409 ? 'error' : ''}/>
                </div>

                <div className="form-checkbox-group">Hyväksyn Kotilogin käyttöehdot <input type="checkbox" required/></div>
                <div className="form-button-group">
                    <button className="primary" type="submit" disabled={loading}>Luo Tili</button>
                </div>

                {
                    loading ? <LoadingSpinner size={'3rem'} message="Luodaan tiliä"/> : null
                }

                {
                    error !== 0 ? 
                    <div className="form-error">
                        {
                            error === 409 ? 
                            "Annetut salasanat eivät täsmää!" :
                            error === 406 ?
                            "Tili annetulla sähköpostiosoitteella on jo olemassa!" :
                            null
                        }
                    </div>
                    :
                    null
                }
                
            </form>
        </div>
    )
}

export default Signup;