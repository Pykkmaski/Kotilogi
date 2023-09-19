"use server";

import formDataToType from "kotilogi-app/utils/formDataToType";
import nodemailer, { TransportOptions } from 'nodemailer';
import {transportOptions} from 'kotilogi-app/nodemailer.config';

type MessageDataType = {
    email: string,
    name?: string,
    message: string,
}

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

                    header, footer{
                        background: #333333;
                    }

                    main{
                        background: #4d4d4d;
                    }

                </style>
            </head>

            <body>
                <header>
                    <h1>Kotilogin Yhteydenotto</h1>
                </header>
                <main>
                    ${message}
                </main>
                <footer>
                    <strong>Kotilogi</strong>
                    <small>Timontie, Vaasa</small>
                </footer>
            </body>
        </html>
    `

}

export default async function serverSendContactMessage(data: MessageDataType): Promise<boolean>{
    try{
        const transport = nodemailer.createTransport(transportOptions as TransportOptions);
        const to = process.env.SERVICE_CONTACT_EMAILS as string;

        transport.sendMail({
            from: data.email,
            to: to.split(','),
            subject: 'Kotilogin yhteydenotto',
            html: createMessageHTML(data.email, data.message),
        }, async (err, info) => {
            if(err) {
                console.log(err);
                return false;
            }
        });

        return true;
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}