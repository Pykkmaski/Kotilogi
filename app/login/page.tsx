"use client";

import styles from './page.module.scss';
import Form from 'kotilogi-app/components/Form';
import {signIn} from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import {useState, useRef} from 'react';

export default function LoginPage(props){
    const router = useRouter();
    const params = useSearchParams();
    const error = params?.get('error');
    const [loading, setLoading] = useState(false);
    const formEmail = 'kl-login-form-email';

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const credentials = {
            email: e.target.email.value,
            password: e.target.password.value,
            callbackUrl: '/properties',
        }

        sessionStorage.removeItem(formEmail);
        signIn('credentials', credentials);

    }

    const cancelHandler = () => {
        router.push('/');
    }
    
    const getEmailField = () => sessionStorage && sessionStorage.getItem(formEmail) as string | undefined;
    const setEmailField = (value: string) => sessionStorage.setItem(formEmail, value);
    return (
        <div className={styles.container}>
            <Form onSubmit={onSubmitHandler}>
                <Form.Header>Kirjaudu Sisään</Form.Header>
                <Form.Group>
                    <label>Sähköpostiosoite</label>
                    <input 
                        name="email" 
                        type="email" 
                        required 
                        className={error === 'invalid_user' ? 'error' : undefined} 
                        defaultValue={getEmailField()}
                        onChange={(e) => setEmailField(e.target.value)}></input>
                </Form.Group>

                <Form.Group>
                    <label>Salasana</label>
                    <input type="password" name="password" required className={error === 'invalid_password' ? 'error' : undefined}></input>
                </Form.Group>

                <Form.ButtonGroup>
                    <button type="button" className="secondary" disabled={loading} onClick={cancelHandler}>Peruuta</button>
                    <button type="submit" className={loading ? 'primary loading' : 'primary'} disabled={loading}>Lähetä</button>
                </Form.ButtonGroup>

                {
                    error &&
                    error === 'invalid_user' ? <Form.Error>Tiliä annetulla käyttäjätunnuksella ei ole!</Form.Error>
                    :
                    error === 'invalid_password' ? <Form.Error>Annettu salasana on väärä!</Form.Error>
                    :
                    <></>
                }
            </Form>
        </div>
    )
}