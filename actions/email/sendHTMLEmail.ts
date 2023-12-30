'use server';

import { ErrorCode } from "kotilogi-app/constants";
import { transportOptions } from "kotilogi-app/nodemailer.config";
import nodemailer from 'nodemailer';

/**
 * Sends an email with html content using nodemailer.
 * @param {string} subject The subject string of the email.
 * @param {string} from The sender of the email.
 * @param {string} to The recipient of the email.
 * @param {string} content The html content to send.
 * @returns {Promise<Kotilogi.Error>} A promise resolving to a custom Error-object containing a message and an error code.
 */

export default async function sendHTMLEmail(subject: string, from: string, to: string | string [], content: string): Promise<Kotilogi.Error>{
    return new Promise((resolve, reject) => {
        const transport = nodemailer.createTransport(transportOptions);
        var error = {
            message: null,
            code: ErrorCode.SUCCESS,
        };
        
        transport.sendMail({
            subject,
            from,
            to,
            html: content,
        }, (err, info) => {
            if(err){
                console.log(err);
                error.code = ErrorCode.UNEXPECTED;
                reject(error);
            }
            else{
                resolve(error);
            }
        });
    })  
}