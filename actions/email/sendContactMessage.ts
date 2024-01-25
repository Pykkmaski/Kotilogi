"use server";

import { logError } from "kotilogi-app/utils/logError";
import {sendEmail} from "./sendEmail";

type MessageDataType = {
    email: string,
    name?: string,
    message: string,
}

/**
 * Creates an HTML layout containing the provided message.
 * @param {string} from The email address of the sender, to be displayed on the bottom of the html.
 * @param message The message to be sent.
 * @returns {string} An html layout containing the message.
 */

function createMessageHTML(from: string, message: string): string{
    return `
        <html>
            <head>
                <style>
                    *{
                        color: white;
                        font-family: Helvetica;
                        text-align: center;
                    }

                    body{
                        display: flex;
                        flex-flow: column;
                    }

                    .header, .footer{
                        background: #333333;
                        margin: 0;
                    }

                    .content{
                        background: #4d4d4d;
                    }

                </style>
            </head>

            <body>
                <div class="header">
                    <h1>Kotilogin Yhteydenotto</h1>
                </div>
                <div class="content">
                    ${message}
                </div>
                <div class="footer">
                    <strong>Kotilogi</strong>
                    <small>Timontie, Vaasa</small>
                    <small>Lähettäjä: <a href="mailto: ${from}">${from}</a><small>
                </div>
            </body>
        </html>
    `

}

export async function sendContactMessage(data: MessageDataType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            const to = process.env.SERVICE_CONTACT_EMAILS as string;
            await sendEmail('Kotilogin Yhteydenotto', data.email, to.split(','), data.message);
            resolve();
        }
        catch(err){
            logError(err);
            reject(err);
        }
    })
}