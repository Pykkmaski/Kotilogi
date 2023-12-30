"use client";

import styles from './page.module.scss';
import Form from 'kotilogi-app/components/Form/Form';
import {signIn} from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {useState, useRef} from 'react';
import Gradient from 'kotilogi-app/components/Gradient/Gradient';
import SecondaryButton from 'kotilogi-app/components/Button/SecondaryButton';
import PrimaryButton from 'kotilogi-app/components/Button/PrimaryButton';
import { Input } from 'kotilogi-app/components/Input/Input';

export default function LoginPage(){
    const router = useRouter();
    const params = useSearchParams();
    const [loading, setLoading] = useState(false);

    const formEmail = 'kl-login-form-email';
    const error = params?.get('error');
    const email = params?.get('email');
    
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const credentials = {
            email: e.target.email.value,
            password: e.target.password.value,
            callbackUrl: '/properties',
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
                        type="email" 
                        name="email" 
                        required={true} 
                        placeholder="Kirjoita sähköpostiosoitteesi..."
                        defaultValue={getEmailField()}
                        onChange={(e) => setEmailField(e.target.value)}/>
                </Form.Group>

                <Form.Group>
                    <div className={styles.passwordLabelContainer}>
                        <label>Salasana</label>
                        <Link href="/login/reset">Unohditko salasanasi?</Link>
                    </div>

                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Kirjoita salasanasi..."
                        required 
                        className={error === 'invalid_password' ? 'error' : undefined}/>
                </Form.Group>

                <Form.Group direction="horizontal">
                    <SecondaryButton 
                        desktopText='Peruuta' 
                        type="button" 
                        disabled={loading} 
                        onClick={cancelHandler}
                    />

                    <PrimaryButton 
                        desktopText='Kirjaudu'
                        type="submit"
                        disabled={loading}
                        loading={loading}
                    />
                </Form.Group>

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