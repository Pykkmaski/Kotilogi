"use client";

import Form from 'kotilogi-app/components/Form';
import styles from './page.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage(props){

    const params = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const error = params!.get('error');

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const {password1, password2} = e.target;

        try{
            setLoading(true);
            if(password1.value !== password2.value) throw 'password_mismatch'

            const credentials = {
                email: e.target.email.value,
                password: password1.value,
            }

            await axios.post('/api/register', credentials);
            router.replace('/login?event=newUserCreated');

        }
        catch(err){
            var error: string | null = typeof(err) === 'string' ? err : null;

            if(err.response?.status === 406){
                error = 'invalid_user'
            }
            else if(err.response?.status === 500){
                error = 'server'
            }

            router.replace('/register?error=' + error);
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

    const passLen = 8;

    return (
        <div className={styles.container}>
            <Form onSubmit={onSubmitHandler}>
                <Form.Header>Luo Tili</Form.Header>

                <Form.Group>
                    <Form.Label>Sähköpostiosoite</Form.Label>
                    <input 
                        name="email" 
                        type="email" 
                        required={true} 
                        className={error === 'invalid_user' ? 'error' : undefined}
                        defaultValue={getEmailField()}
                        onChange={(e) => setEmailField(e.target.value)}
                        ></input>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Salasana</Form.Label>
                    <input name="password1" type="password" required={true} className={error === 'password_mismatch' ? 'error' : undefined}></input>
                    <Form.SubLabel>Salasanan tulee olla vähintään {passLen} merkkiä pitkä.</Form.SubLabel>
                </Form.Group>

                <Form.Group>
                    <label>Anna Salasana Uudelleen</label>
                    <input type="password" name="password2" minLength={passLen} className={error === 'password_mismatch' ? 'error' : undefined}></input>
                </Form.Group>

                <div className={styles.agreementContainer}>
                    <span className={styles.tosAgreementText}>
                        Olen lukenut ja hyväksyn Kotilogin <a href="/tos" target="_blank">käyttöehdot</a>
                    </span>

                    <input type="checkbox" required={true}></input>
                </div>

                <Form.ButtonGroup>
                    <button type="button" className="secondary" onClick={cancelHandler} disabled={loading}>Peruuta</button>
                    <button type="submit" className={loading ? "primary loading" : "primary"} disabled={loading}>Lähetä</button>
                </Form.ButtonGroup>

                {
                    error && 
                    error === 'password_mismatch' ? <Form.Error>Salasanat eivät täsmää!</Form.Error>
                    :
                    error === 'invalid_user' ? <Form.Error>Tili annetulla sähköpostisoitteella on käytössä!</Form.Error>
                    :
                    <></>
                }
            </Form>
        </div>
    )
}