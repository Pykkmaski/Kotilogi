module.exports = {
    transportOptions : {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port : 465,
        secure: true,
        auth: {
            user: process.env.SERVICE_EMAIL_ADDRESS,
            pass: process.env.SERVICE_EMAIL_PASSWORD,
        },
        tls : { rejectUnauthorized: false }
    },
}