"use server";

import serverSendHTMLEmail from "./serverSendHTMLEmail";

type MessageDataType = {
    email: string,
    name?: string,
    message: string,
}

function createMessageHTML(message: string): string{
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
                </div>
            </body>
        </html>
    `

}

export default async function serverSendContactMessage(data: MessageDataType): Promise<boolean>{
    try{
        const to = process.env.SERVICE_CONTACT_EMAILS as string;

        const emailSuccess = await serverSendHTMLEmail('Kotilogin Yhteydenotto', data.email, to.split(','), createMessageHTML(data.message));
        if(!emailSuccess) throw new Error('Failed to send contact message!');

        return true;
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}