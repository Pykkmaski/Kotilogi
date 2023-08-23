import { useContext, useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import AppContext from '../../contexts/AppContext';
import axios from 'axios';
import LoadingSpinner from '../Components/Spinner';

function Login(props){

    const {setToken, setUser, userActiveStatus, setUserActiveStatus} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(0);
    const firstRender = useRef(true);

    function onSubmitHandler(e){
        e.preventDefault();
        setLoading(true);
        setError(0);

        axios.post('/api/login', {
            email: e.target.email.value,
            password: e.target.password.value,
        })
        .then(res => {
            const token = res.data.token;
            setToken(token);
            setUser({
                email: res.data.email,
                active: res.data.active,
            });
            location.assign('/');
        })
        .catch(err => {
            setError(err.response.status);
        })
        .finally(() => {
            setLoading(false);
        });
    }
   
    return (
        <div id="login-page">
            <div className="bg-blur"></div>
            <form onSubmit={onSubmitHandler} className="animated">
                <div className="form-title">Kirjaudu Sisään</div>
                <div className="form-group">
                    <label>Sähköpostiosoite</label>
                    <input type="email" required name="email" className={error === 404 ? 'error' : null}/>
                </div>

                <div className="form-group">
                    <label>Salasana</label>
                    <input type="password" required name="password" className={error === 401 ? 'error' : null}/>
                </div>

                <div className="form-button-group">
                    <button className="primary" type="submit" disabled={loading}>
                        {
                            !loading ?
                            'Kirjaudu Sisään' :
                            'Kirjaudutaan Sisään...'
                        }
                    </button>
                </div>

                <div className="form-links">
                    <Link to="/reset/password" id="password-reset-link">Unohditko Salasanasi?</Link>
                </div>

                <div className="form-spinner">
                    {
                        loading ? <LoadingSpinner size={"3rem"} message={'Kirjaudutaan sisään'}/> : null
                    }
                </div>
                
                {
                    error !== 0 ?
                        <div className="form-error">
                            {
                                error === 404 ?
                                'Tiliä annetulla käyttäjänimellä ei ole!' :
                                error === 401 ?
                                'Annettu salasana on virheellinen!' :
                                null
                            }
                        </div> : 
                    null
                }
                
            </form>
        </div>
      
      
    );
}

export default Login;