"use client";

import { useRef, useState } from 'react';
import Form from 'kotilogi-app/components/Form/Form';
import axios from 'axios';
import styles from './component.module.scss';
import {sendContactMessage} from 'kotilogi-app/actions/email/sendContactMessage';
import toast from 'react-hot-toast';

function ContactForm(props){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(-1);
    const formRef = useRef<HTMLFormElement | null>(null);

    const messageLength = useRef(0);

    async function onSubmitHandler(e){
        e.preventDefault();
        setLoading(true);

        const messageData = {
            name: e.target.name.value,
            message: e.target.message.value,
            email: e.target.email.value,
        }

        sendContactMessage(messageData)
        .then(() => {
            if(formRef.current){
                formRef.current.reset();
                console.log('Form reset');
            }
            
            setError(0); 
        })
        .catch(err => toast.error(err.message))
        .finally(() => setLoading(false));
    }

    return (
        <form onSubmit={onSubmitHandler} className={styles.form} ref={formRef}>
            <Form.Group>
                <label>Nimesi</label>
                <input type="text" name="name" id="contact-name-input" placeholder="Kirjoita nimesi..."/>
            </Form.Group>

            <Form.Group>
                <label>Sähköpostiosoitteesi<span className="danger">*</span></label>
                <input type="email" name="email" required={true} id="contact-email-input" placeholder="Kirjoita sähköpostiosoitteesi..."/>
            </Form.Group>

            <Form.Group>
                <label>Viesti<span className="danger">*</span></label>
                <textarea name="message" maxLength={200} required={true} id="contact-message-input" placeholder="Kirjoita viestisi..."/>
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
        </form>
    )
}

export default ContactForm;