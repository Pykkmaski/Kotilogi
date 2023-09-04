"use server"

import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import db from 'kotilogi-app/dbconfig';
import { StatusCode } from 'kotilogi-app/utils/statusCode';
import fs from 'fs';

export async function resetPassword(verificationCode: string, newPassword: string, email: string): Promise<number>{
    try{
        const verifyResult = await verifyResetCode(verificationCode, email);
        if(verifyResult !== 0) return verifyResult;

        await db('users').where({email}).update({
            password: await bcrypt.hash(newPassword, 15) as string,
        });

        await db('password_reset_codes').where({user: email}).del();
        return StatusCode.SUCCESS;
    }
    catch(err){
        console.log(err.message);
        return StatusCode.UNEXPECTED;
    }
}

export async function verifyResetCode(code: string, email: string): Promise<number>{
    const correct: object & {expires: number, reset_code: string} | undefined = await db('password_reset_codes').where({user: email}).first();
    if(correct === undefined) return StatusCode.UNEXPECTED;

    const currentTime: number = new Date().getTime();
    if(currentTime > correct.expires) return StatusCode.EXPIRED;

    if(correct.reset_code === code) return StatusCode.SUCCESS;

    return StatusCode.MISMATCH;
}

export async function sendResetCode(email: string): Promise<number>{
    const {transportOptions} = require('kotilogi-app/nodemailer.config');
    const transport = nodemailer.createTransport(transportOptions);

    const numbers: number[] = [];
    for(let i = 0; i < 6; ++i){
        numbers.push(crypto.randomInt(6));
    }

    const resetCode: string = numbers.join('');
    const htmlContent = `
        <html>
            <head>
                <style>
                    .container{
                        text-align: center !important;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }

                    .container p{
                        color: gray;
                        font-size: 1.25rem;
                    }
                    .container h1{
                        font-size: 2rem;
                    }

                    .container .contact{
                        color: black !important;
                    }
                </style>

            </head>
            <body>
                <div class="container">
                    <h2>Salasanan nollauskoodi</h2>
                    <p>
                        Olet pyytänyt salasanasi nollausta.</br>
                        Kopioi alla oleva koodi sille varattuun kenttään 30 minuutin kuluessa.</br>
                        Jos et pyytänyt salasanasi nollausta, voit jättää tämän viestin huiomioimatta.
                    </p>

                    <h1>${resetCode}</h2>
                    <p>
                        <a href="mailto:kotilogi.service@gmail.com">kotilogi.service@gmail.com</a></br>
                        <span class="contact"><strong>Kotilogi</strong>, Timontie 13 Vaasa</span>
                    </p>
                        
                </div>
            </body>
        </html>
       
    `;
    var status = StatusCode.SUCCESS;

    transport.sendMail({
        from: process.env.SERVICE_EMAIL_ADDRESS,
        to: email,
        subject: 'Salasanan nollaus',
        html: htmlContent,
    }, async (err, info) => {
        if(err) {
            console.log(err);
            status = StatusCode.UNEXPECTED;
        }
        else{
            try{
                await db('password_reset_codes').insert({
                    user: email,
                    expires: new Date().getTime() + (1000 * 60 * 30),
                    reset_code: resetCode,
                })
                .onConflict('user')
                .merge();
            }
            catch(err){
                status = StatusCode.UNEXPECTED;
            }
        }
    });

    console.log('Code sent with status ' + status);
    return status;
}