"use client";

import Form from 'kotilogi-app/components/Form/Form';
import styles from './page.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Button from 'kotilogi-app/components/Button/Button';
import Gradient from 'kotilogi-app/components/Gradient/Gradient';
import {registerUser} from 'kotilogi-app/actions/registerUser';
import { ErrorCode, MIN_PASSWORD_LENGTH } from 'kotilogi-app/constants';
import { RegisterError } from 'kotilogi-app/utils/error';

export default function RegisterPage(){
    const rerouteTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
    const router = useRouter();
    const params = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<RegisterError>('none');

    const plan = params.get('plan') || 'regular';

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const {password1, password2} = e.target;

        setLoading(true);
        setError('none');

        if(password1.value !== password2.value) {
            setError('password_mismatch');
        }
        else{
            const credentials = {
                email: e.target.email.value,
                password: password1.value,
                plan,
            }

            registerUser(credentials)
            .then(res => {
                setError('success');
                //Automatically reroute to the login page after succesfull registration.
                const loginTransitionTime = 3000;
                rerouteTimeout.current = setTimeout(() => router.replace('/login'), loginTransitionTime);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => setLoading(false));
        }
    }

    const cancelHandler = () => {
        router.replace('/');
    }

    const formEmailField = 'kl-form-register-email';
    const getEmailField = () => sessionStorage && sessionStorage.getItem(formEmailField) as string | undefined;
    const setEmailField = (value: string) => sessionStorage && sessionStorage.setItem(formEmailField, value);

    useEffect(() => {
        //Clear the reroute timeout before each render.
        if(rerouteTimeout.current === null) return;
        return () => clearTimeout(rerouteTimeout.current);
    }, []);
    
    return (
        <div className={styles.container}>
            <Gradient direction={'bottom'}/>
            <Form onSubmit={onSubmitHandler}>
                <Form.Header>Luo Tili</Form.Header>

                <Form.Group>
                    <Form.Label>Sähköpostiosoite</Form.Label>
                    <input 
                        name="email" 
                        type="email" 
                        required={true} 
                        placeholder="Kirjoita sähköpostiosoitteesi..."
                        className={error === 'user_exists' ? 'error' : undefined}
                        defaultValue={getEmailField()}
                        onChange={(e) => setEmailField(e.target.value)}
                        ></input>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Salasana</Form.Label>
                    <input 
                        name="password1" 
                        type="password" 
                        required={true} 
                        className={error === 'password_mismatch' ? 'error' : undefined} 
                        placeholder="Kirjoita salasana..."
                        minLength={MIN_PASSWORD_LENGTH}></input>
                    <Form.SubLabel>Salasanan tulee olla vähintään {MIN_PASSWORD_LENGTH} merkkiä pitkä.</Form.SubLabel>
                </Form.Group>

                <Form.Group>
                    <label>Anna Salasana Uudelleen</label>
                    <input 
                        type="password" 
                        name="password2" 
                        className={error === 'password_mismatch' ? error : undefined}
                        placeholder="Kirjoita salasana vielä uudelleen..."/>
                </Form.Group>

                <div className={styles.agreementContainer}>
                    <span className={styles.tosAgreementText}>
                        Olen lukenut ja hyväksyn Kotilogin <a href="/tos" target="_blank">käyttöehdot</a>
                    </span>

                    <input type="checkbox" required={true}></input>
                </div>

                <Form.Group direction="horizontal">
                    <Button
                        type="button"
                        desktopText='Peruuta'
                        className="secondary"
                        onClick={cancelHandler}
                        disabled={loading}
                    />

                    <Button
                        type="submit"
                        desktopText='Lähetä'
                        className="primary"
                        disabled={loading}
                        loading={loading}
                    />
                </Form.Group>

                {
                    error === 'password_mismatch' ? <Form.Error>Antamasi salasana on väärä!</Form.Error>
                    :
                    error === 'user_exists' ? <Form.Error>Tili antamallesi sähköpostiosoitteelle on jo olemassa!</Form.Error>
                    :
                    error === 'success' ? <Form.Success>Tili luotu onnistuneesti! Sinut uudelleenohjataan kirjautumaan...</Form.Success>
                    :
                    <></>
                }
            </Form>
        </div>
    )
}