"use client";

import { useRef, useState } from 'react';
import Form from 'kotilogi-app/components/Form';
import axios from 'axios';
import styles from './component.module.scss';

function ContactForm(props){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(-1);
    
    const messageLength = useRef(0);

    function onSubmitHandler(e){
        e.preventDefault();
        setLoading(true);

        axios.post('/api/contact', {
            email: e.target.email.value,
            message: e.target.message.value,
            name: e.target.name.value || ''
        })
        .then(res => {
            setError(0);
            e.target.email.value = e.target.message.value = e.target.name.value = "";
        })
        .catch(err => {
            setError(err.response.status);
        })
        .finally(() => setLoading(false));
    }

    return (
        <Form onSubmit={onSubmitHandler} className={styles.form}>
            <Form.Group>
                <Form.Label>Nimesi</Form.Label>
                <Form.Control type="text" name="name" id="contact-name-input"></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Sähköpostiosoitteesi</Form.Label>
                <Form.Control type="email" name="email" required={true} id="contact-email-input"></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Viesti</Form.Label>
                <Form.Control type="textarea" name="message" maxLength={200} required={true} id="contact-message-input"></Form.Control>
            </Form.Group>

            <Form.ButtonGroup>
                <button type="submit" className={styles.submitButton} disabled={loading} id="contact-submit-button">Lähetä</button>
            </Form.ButtonGroup>

            {
                loading ? <Form.Spinner size="2rem"></Form.Spinner> : <></>
            }

            {
                error === 0 ? <Form.Success className={styles.formSuccess}>Viesti lähetetty!</Form.Success>
                :
                error === 500 ? <Form.Error>Jotain meni pieleen!</Form.Error>
                :
                <></>
            }
        </Form>
    )
}

export default ContactForm;