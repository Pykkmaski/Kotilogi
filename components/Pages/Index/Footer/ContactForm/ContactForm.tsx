"use client";

import { useRef, useState } from 'react';
import Form from 'kotilogi-app/components/Form/Form';
import axios from 'axios';
import styles from './component.module.scss';
import serverSendContactMessage from 'kotilogi-app/actions/serverSendContactMessage';

function ContactForm(props){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(-1);
    
    const messageLength = useRef(0);

    async function onSubmitHandler(e){
        e.preventDefault();
        setLoading(true);

        const messageData = {
            name: e.target.name.value,
            message: e.target.message.value,
            email: e.target.email.value,
        }

        const result = await serverSendContactMessage(messageData);
        if(!result){
            console.log('Could not send contact message!');
            setError(500);
        }
        else{
            setError(0); 
            e.target.name.value = null;
            e.target.message.value = null;
            e.target.email.value = null;
        }

        setLoading(false);
    }

    return (
        <Form onSubmit={onSubmitHandler} className={styles.form}>
            <Form.Group>
                <Form.Label>Nimesi</Form.Label>
                <input type="text" name="name" id="contact-name-input"/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Sähköpostiosoitteesi</Form.Label>
                <input type="email" name="email" required={true} id="contact-email-input"/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Viesti</Form.Label>
                <textarea name="message" maxLength={200} required={true} id="contact-message-input"/>
            </Form.Group>

            <Form.Group direction="horizontal">
                <button type="submit" className={styles.submitButton} disabled={loading} id="contact-submit-button">Lähetä</button>
            </Form.Group>

            {
                loading ? <Form.Spinner size="2rem"></Form.Spinner> : <></>
            }

            {
                error === 0 ? <Form.Success className={styles.formSuccess}>Viesti lähetetty!</Form.Success>
                :
                error === 500 ? <Form.Error>Jotain meni pieleen! Yritä myöhemmin uudelleen.</Form.Error>
                :
                <></>
            }
        </Form>
    )
}

export default ContactForm;