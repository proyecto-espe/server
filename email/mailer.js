const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const accountTransport = require("./account_transport.json");

const mail = async (emailData, res) => {
    const oauth2Client = new OAuth2(
        accountTransport.auth.clientId,
        accountTransport.auth.clientSecret,
        "https://developers.google.com/oauthplayground",
    );
    
    oauth2Client.setCredentials({
        refresh_token: accountTransport.auth.refreshToken
    });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: accountTransport.auth.user,
            clientId: accountTransport.auth.clientId,
            clientSecret: accountTransport.auth.clientSecret,
            refreshToken: accountTransport.auth.refreshToken,
            accessToken: accountTransport.auth.accessToken,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // Configura el correo electrónico que deseas enviar
    const mailOptions = {
        from: accountTransport.auth.user,
        to: emailData.email,
        subject: emailData.subject,
        text: emailData.text,
    };

    if(emailData.type === "html") {
      delete mailOptions.text
      mailOptions.html = emailData.text
    }
    // Envía el correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
            res.json({result: false, error})
        } else {
            console.log('Correo enviado con éxito:', info.response);
            res.json({result: true, info})
        }
    });
};

module.exports = { mail }
