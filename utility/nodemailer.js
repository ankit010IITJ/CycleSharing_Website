const nodemailer = require("nodemailer");

module.exports.sendMail = async function sendMail(str, data){
    const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "ankitraj010j@gmail.com",
        pass: "ncgh dent pmnz yjce",
    },
    });

    var Osubject, Otext, Ohtml;
    if(str == "signup"){
        Osubject = `Thank you for signing ${data.name}`;
        Ohtml = `
        <h1>Welcome to cycleSharingWebsite.com</h1>
        Hope you have a good time !
        Here are your details-
        Name - ${data.name}
        Email - ${data.email}
        `
    }
    else if(str == "resetpassword"){
        Osubject = `Reset Password`;
        Ohtml = `
        <h1>foodApp.com</h1>
        Here is your link to reset your password !
        ${data.resetPasswordLink}
        `
    }

    let info = await transporter.sendMail({
        from: '"Food App" <ankitraj010j@gmail.com>',
        to: data.email,
        subject: Osubject,
        html: Ohtml
    });

    console.log("Message sent: %s", info.messageId);
}