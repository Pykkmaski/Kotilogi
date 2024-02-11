"use server";

import { logError } from "kotilogi-app/utils/logError";
import {sendEmail} from "./sendEmail";
import { serviceName } from "kotilogi-app/constants";
import { sendHTMLEmail } from "./sendHTMLEmail";

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
                    padding: 1rem;
                }

                .content{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    background: #DDD;
                    padding: 1rem;
                }

                .card{
                    display: flex;
                    flex-flow: column;
                    
                    border-radius: 10px;
                    color: black;
                    background: white;
                    padding: 1rem;
                }

                .card strong{
                    margin-top: 2rem;
                    color: black;
                }

            </style>
        </head>

        <body>
            <div class="header">
                <h1>Kotilogin Yhteydenotto</h1>
            </div>

            <div class="content">
                <div class="card">
                    ${message}

                    <strong>${from}</strong>
                </div>
            </div>

            <footer class="footer">
                <strong>${serviceName}</strong>
                <small>Timontie, Vaasa</small>
                <small>Lähettäjä: <a href="mailto: ${from}">${from}</a><small>
            </footer>
        </body>
    </html>
    `
}

export async function sendContactMessage(data: MessageDataType){
    return new Promise<void>(async (resolve, reject) => {
        try{
            const to = process.env.SERVICE_CONTACT_EMAILS as string;
            const msg = createMessageHTML(data.email, data.message);
            await sendHTMLEmail(serviceName, data.email, to.split(','), msg);

            resolve();
        }
        catch(err){
            logError(err);
            reject(err);
        }
    })
}