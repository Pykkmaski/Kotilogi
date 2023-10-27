"use client";

import Button from 'kotilogi-app/components/Button/Button';
import styles from './page.module.scss';
import Form from 'kotilogi-app/components/Form';
import {signIn} from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {useState, useRef} from 'react';
import Gradient from 'kotilogi-app/components/Gradient/Gradient';

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
            callbackUrl: '/auth/properties',
        }

        signIn('credentials', credentials);

    }

    const cancelHandler = () => {
        router.push('/');
    }
    
    const getEmailField = () => sessionStorage && sessionStorage.getItem(formEmail) as string | undefined;
    const setEmailField = (value: string) => {
        if(!sessionStorage) return '';

        sessionStorage.setItem(formEmail, value);
    }

    return (
        <div className={styles.container}>
            <Gradient direction='bottom'/>
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
                    <div className={styles.passwordLabelContainer}>
                        <label>Salasana</label>
                        <Link href="/login/reset">Unohditko salasanasi?</Link>
                    </div>
                   
                    <input type="password" name="password" required className={error === 'invalid_password' ? 'error' : undefined}></input>
                </Form.Group>

                <Form.ButtonGroup>
                    <Button 
                        desktopText='Peruuta' 
                        type="button" 
                        className="secondary" 
                        disabled={loading} 
                        onClick={cancelHandler}
                    />

                    <Button 
                        desktopText='Kirjaudu'
                        type="submit"
                        className="primary"
                        disabled={loading}
                        loading={loading}
                    />
                </Form.ButtonGroup>

                {
                    error &&
                    error === 'invalid_user' ? <Form.Error>Tiliä annetulla käyttäjätunnuksella ei ole!</Form.Error>
                    :
                    error === 'invalid_password' ? <Form.Error>Annettu salasana on väärä!</Form.Error>
                    :
                    error === 'undefined' ? <Form.Error>Tuntematon Virhe!</Form.Error>
                    :
                    <></>
                }
            </Form>
        </div>
    )
}