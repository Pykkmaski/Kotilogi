"use client";

import Form from 'kotilogi-app/components/Form/Form';
import styles from './page.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Button from 'kotilogi-app/components/Button/Button';
import Gradient from 'kotilogi-app/components/Gradient/Gradient';
import {registerUser} from 'kotilogi-app/actions/registerUser';
import { ErrorCode, MIN_PASSWORD_LENGTH } from 'kotilogi-app/constants';

export default function RegisterPage(){

    const rerouteTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
    const router = useRouter();
    const params = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(-1);

    const plan = params.get('plan') || 'regular';

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const {password1, password2} = e.target;

        try{
            setLoading(true);
            setError(-1);

            if(password1.value !== password2.value) throw {
                message: null,
                code: ErrorCode.PASSWORD_MISMATCH,
            }

            const credentials = {
                email: e.target.email.value,
                password: password1.value,
                plan,
            }

            registerUser(credentials)
            .then(res => {
                setError(0);
            })
            .catch(err => setError(1));

            //Automatically reroute to the login page after succesfull registration.
            const loginTransitionTime = 3000;
            rerouteTimeout.current = setTimeout(() => router.replace('/login'), loginTransitionTime);
        }
        catch(err){
            setError(err.code);
        }
        finally{
            setLoading(false);
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
                        className={error === ErrorCode.INVALID_USER ? 'error' : undefined}
                        defaultValue={getEmailField()}
                        onChange={(e) => setEmailField(e.target.value)}
                        ></input>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Salasana</Form.Label>
                    <input name="password1" type="password" required={true} className={error === ErrorCode.PASSWORD_MISMATCH ? 'error' : undefined} minLength={MIN_PASSWORD_LENGTH}></input>
                    <Form.SubLabel>Salasanan tulee olla vähintään {MIN_PASSWORD_LENGTH} merkkiä pitkä.</Form.SubLabel>
                </Form.Group>

                <Form.Group>
                    <label>Anna Salasana Uudelleen</label>
                    <input type="password" name="password2" className={error === ErrorCode.PASSWORD_MISMATCH ? 'error' : undefined}></input>
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
                    error === 1 ? <Form.Error>Kirjautuminen epäonnistui! Tarkista antamasi tiedot.</Form.Error>
                    :
                    error === 0 ? <Form.Success>Tili luotu onnistuneesti! Sinut uudelleenohjataan kirjautumaan...</Form.Success>
                    :
                    <></>
                }
            </Form>
        </div>
    )
}