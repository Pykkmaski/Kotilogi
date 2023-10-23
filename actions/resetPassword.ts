"use server"

import bcrypt from 'bcrypt';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import db from 'kotilogi-app/dbconfig';
import { StatusCode } from 'kotilogi-app/utils/statusCode';
import jwt from 'jsonwebtoken';
import domainName from 'kotilogi-app/domain.config';
import path from 'path';
import * as fs from 'fs';
import serverSendHTMLEmail from './serverSendHTMLEmail';
export async function resetPassword(verificationCode: string, newPassword: string): Promise<number>{
    try{
        const decoded: any = await verifyToken(verificationCode);
        if(decoded === null) throw new Error('Invalid token');

        const currentTime = new Date().getTime();
        if(currentTime > decoded.expires) return StatusCode.EXPIRED;

        await db('users').where({email: decoded.email}).update({
            password: await bcrypt.hash(newPassword, 15) as string,
        });

        return StatusCode.SUCCESS;
    }
    catch(err){
        console.log(err.message);
        return StatusCode.UNEXPECTED;
    }
}

export async function verifyToken(token: string): Promise<jwt.JwtPayload | null>{
    try{
        const decoded: any = jwt.verify(token, process.env.PASSWORD_RESET_SECRET as jwt.Secret);
        return decoded;
    }
    catch(err){
        console.log(err.message);
        return null;
    }
}

export async function sendResetCode(email: string): Promise<number>{
    const user = await db('users').where({email}).select('email');
    if(!user.length) return StatusCode.INVALID_USER;

    const numbers: number[] = [];
    for(let i = 0; i < 6; ++i){
        numbers.push(crypto.randomInt(6));
    }

    const payload = {
        email,
        expires: new Date().getTime() + (1000 * 60 * 30),
    }

    const resetToken: string = jwt.sign(payload, process.env.PASSWORD_RESET_SECRET as jwt.Secret);
    const link = `${domainName}/login/reset?token=${resetToken}`;
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
                    
                    .container .reset-link{
                        font-size: 2rem;
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
                        Klikkaa alla olevaa linkkiä 30 minuutin kuluessa.</br>
                        Jos et pyytänyt salasanasi nollausta, voit jättää tämän viestin huiomioimatta.
                    </p>

                    <a href=${link} class="reset-link">${link}</a>
                    <p>
                        <a href="mailto:kotilogi.service@gmail.com">kotilogi.service@gmail.com</a></br>
                        <span class="contact"><strong>Kotilogi</strong>, Timontie 13 Vaasa</span>
                    </p>
                        
                </div>
            </body>
        </html>
    `;

    const emailSuccess = await serverSendHTMLEmail('Salasanan nollaus', process.env.SERVICE_EMAIL_ADDRESS || 'Kotilogi', email, htmlContent);
    if(!emailSuccess) return StatusCode.UNEXPECTED;

    return StatusCode.SUCCESS;
}