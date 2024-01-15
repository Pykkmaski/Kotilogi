"use server"

import bcrypt from 'bcrypt';
import crypto from 'crypto';
import db from 'kotilogi-app/dbconfig';
import { StatusCode } from 'kotilogi-app/utils/statusCode';
import jwt from 'jsonwebtoken';
import domainName from 'kotilogi-app/domain.config';
import {sendHTMLEmail} from './email/sendHTMLEmail';
import { ErrorCode } from 'kotilogi-app/constants';

/**
 * Resets the password of the user encoded into the verification code.
 * @param {string} verificationCode A JWT encoding the user whose password to reset.
 * @param {string} newPassword The new password.
 * @returns {Promise<Kotilogi.Error>} Resolves to a custom Error-object containing a message and an error code.
 */

export async function resetPassword(verificationToken: string, newPassword: string): Promise<Kotilogi.Error>{
    try{
        const decoded: any = await verifyToken(verificationToken);
        if(decoded === null) throw new Error('Invalid token');

        const currentTime = new Date().getTime();
        if(currentTime > decoded.expires) return {
            message: 'The token has expired! Cannot reset password.',
            code: ErrorCode.EXPIRED,
        }

        await db('users').where({email: decoded.email}).update({
            password: await bcrypt.hash(newPassword, 15) as string,
        });

        return {
            message: null,
            code: ErrorCode.SUCCESS,
        }
    }
    catch(err){
        console.log(err.message);
        return {
            message: null,
            code: ErrorCode.UNEXPECTED,
        }
    }
}

/**
 * Verifies a token generated for password resetting.
 * @param {string} token The token to verify.
 * @returns {Promise<jwt.JwtPayload | null>} Resolves to the payload encoded by the token, in this case the user, or null if the token is not valid.
 */

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

/**
 * Generates and sends a password reset code to the provided email address.
 * @param {string} email The email address to send the code to.
 * @returns {Promise<Kotilogi.Error>} Resolves to a custom Error-object containing a message and an error code.
 */

export async function sendResetCode(email: string): Promise<Kotilogi.Error>{
    
    const user = await db('users').where({email}).select('email');

    //A user with provided email address does not exist.
    if(!user.length) return {
        message: null,
        code: ErrorCode.INVALID_USER,
    }

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

    try{
        await sendHTMLEmail(
            'Salasanan nollaus', 
            process.env.SERVICE_EMAIL_ADDRESS || 'Kotilogi', 
            email, 
            htmlContent
        );

        return {
            message: null,
            code: ErrorCode.SUCCESS,
        }
    }
    catch(err){
        return {
            message: null,
            code: ErrorCode.UNEXPECTED,
        }
    }
} 