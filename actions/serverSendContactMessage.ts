"use server";

import formDataToType from "kotilogi-app/utils/formDataToType";
import nodemailer, { TransportOptions } from 'nodemailer';
import {transportOptions} from 'kotilogi-app/nodemailer.config';

type MessageDataType = {
    email: string,
    name?: string,
    message: string,
}

export default async function serverSendContactMessage(data: MessageDataType): Promise<boolean>{
    try{
        const transport = nodemailer.createTransport(transportOptions as TransportOptions);
        const to = process.env.SERVICE_CONTACT_EMAIL_ADDRESS;
        console.log(to);

        transport.sendMail({
            from: data.email,
            to: to,
            subject: 'Kotilogin yhteydenotto',
            text: data.message,
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