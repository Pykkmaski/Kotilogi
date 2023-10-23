import { transportOptions } from "kotilogi-app/nodemailer.config";
import nodemailer from 'nodemailer';

export default async function serverSendHTMLEmail(subject: string, from: string, to: string | string [], content: string): Promise<boolean>{
    /**
     * Sends an email with html content using nodemailer.
     * @param {string} subject The subject string of the email.
     * @param {string} from The sender of the email.
     * @param {string} to The recipient of the email.
     * @param {string} content The html content to send.
     * @returns {Promise<boolean>} A promise resolving to true if the email is sent successfully, or false in case of an error.
     */

    try{
        const transport = nodemailer.createTransport(transportOptions);
        transport.sendMail({
            subject,
            from,
            to,
            html: content,
        }, (err, info) => {
            if(err){
                throw new Error('Failed to send email!', err);
            }
        });

        return true;
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}