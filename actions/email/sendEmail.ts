'use server';
import { ErrorCode } from 'kotilogi-app/constants';
import { transportOptions } from 'kotilogi-app/nodemailer.config';
import nodemailer from 'nodemailer';

/**
 * A server-side function that sends a plain text email to the provided address.
 * @param {string} subject The subject string of the email.
 * @param {string} from The email address from which to sen the message.
 * @param {string | string[]} to The email address or array of addresses to which to send a message.
 * @param {string} message The message to be sent.
 * @returns {Promise<Kotilogi.Error>} Resolves to a custom Error-object containing a message and an error code.
 */

export async function sendEmail(subject: string, from: string, to: string | string[], message: string): Promise<Kotilogi.Error>{
    const transport = nodemailer.createTransport(transportOptions);
    return new Promise((resolve, reject) => {
        transport.sendMail({
            subject,
            from,
            to,
            text: message,
        }, (err, info) => {
            if(err){
                reject({
                    message: 'Failed to send mail!',
                    code: ErrorCode.UNEXPECTED,
                });
            }
            else{
                resolve({
                    message: null,
                    code: ErrorCode.SUCCESS
                });
            }
        });
    });
}