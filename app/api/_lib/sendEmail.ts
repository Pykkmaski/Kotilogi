import { transportOptions } from 'kotilogi-app/nodemailer.config';
import nodemailer from 'nodemailer';

/**
 * A server-side function that sends a plain text email to the provided address.
 * @param {string} subject The subject string of the email.
 * @param {string} from The email address from which to sen the message.
 * @param {string | string[]} to The email address or array of addresses to which to send a message.
 * @param {string} message The message to be sent.
 */

export async function sendEmail(
  subject: string,
  from: string,
  to: string | string[],
  message: string
) {
  const transport = nodemailer.createTransport(transportOptions);
  return new Promise<void>((resolve, reject) => {
    transport.sendMail(
      {
        subject,
        from,
        to,
        text: message,
      },
      (err, info) => {
        if (err) {
          console.log(err.message);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}
