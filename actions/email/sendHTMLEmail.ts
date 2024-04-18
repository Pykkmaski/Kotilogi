'use server';

import { transportOptions } from 'kotilogi-app/nodemailer.config';
import nodemailer from 'nodemailer';

/**
 * Sends an email with html content using nodemailer.
 * @param {string} subject The subject string of the email.
 * @param {string} from The sender of the email.
 * @param {string} to The recipient of the email.
 * @param {string} content The html content to send.
 * @returns {Promise<Kotidok.Error>} A promise resolving to a custom Error-object containing a message and an error code.
 */

export async function sendHTMLEmail(subject: string, from: string, to: string | string[], content: string) {
  return new Promise<void>((resolve, reject) => {
    const transport = nodemailer.createTransport(transportOptions);

    transport.sendMail(
      {
        subject,
        from,
        to,
        html: content,
      },
      (err, info) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}
