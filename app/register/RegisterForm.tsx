import Form from "kotilogi-app/components/Form/Form";
import { useRegisterForm } from "./page.hooks";
import { MIN_PASSWORD_LENGTH } from "kotilogi-app/constants";
import Button from "kotilogi-app/components/Button/Button";
import styles from './page.module.scss';
import { useEffect } from "react";

/**This component is responsible for rendering the contents of the register form. */
export function RegisterForm(){
    const {onSubmit, cancelHandler, error, loading} = useRegisterForm();

    useEffect(() => console.log(error), [error]);
    
    return (
        <Form onSubmit={onSubmit}>
                <Form.Header>Luo Tili</Form.Header>

                <Form.Group>
                    <Form.Label>Sähköpostiosoite</Form.Label>
                    <input 
                        name="email" 
                        type="email" 
                        required={true} 
                        placeholder="Kirjoita sähköpostiosoitteesi..."
                        className={error === 'user_exists' ? 'error' : undefined}/>
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
                        className="secondary"
                        onClick={cancelHandler}
                        disabled={loading}
                    >Peruuta</Button>

                    <Button
                        type="submit"
                        className="primary"
                        disabled={loading}
                        loading={loading}
                    >Lähetä</Button>
                </Form.Group>

                {
                    error === 'password_mismatch' ? <Form.Error>Salasanat eivät täsmää!</Form.Error>
                    :
                    error === 'user_exists' ? <Form.Error>Tili antamallesi sähköpostiosoitteelle on jo olemassa!</Form.Error>
                    :
                    error === 'success' ? <Form.Success>Tili luotu onnistuneesti! Sinut uudelleenohjataan kirjautumaan...</Form.Success>
                    :
                    <></>
                }
            </Form>
    )
}