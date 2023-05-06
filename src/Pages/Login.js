import { useContext, useState, useEffect } from 'react';
import AppContext from '../Contexts/AppContext';
import axios from 'axios';
import LinkTo from '../Functions/LinkTo';
import LoadingSpinner from '../Components/Spinner';

function Login(props){

    const {setToken} = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(0);

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
            LinkTo('/user');
            location.reload();
        })
        .catch(err => {
            setError(err.response.status);
        })
        .finally(() => {
            setLoading(false);
        });
    }
   
    return (
        <div className="d-flex flex-column align-items-center">
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
                    <button className="primary" type="submit">Kirjaudu Sisään</button>
                </div>

                <div className="form-spinner">
                    {
                        loading ? <LoadingSpinner size={"3rem"} message={'Kirjaudutaan sisään.'}/> : null
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