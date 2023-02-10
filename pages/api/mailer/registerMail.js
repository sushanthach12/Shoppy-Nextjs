const nodemailer = require('nodemailer')

import auth from '../../../middleware/authUser'

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            await handler(req, res);
            break;
        default: return res.status(400).json({ error: "This method is not allowed" })
    }
}

const handler = async (req, res) => {
    try {
        // const user = await auth(req, res)
        const { name, email } = req.body

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS
            }
        });

        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: `Welcome ${name} - Shoppy`,
            html: `
            <h1> Hi ${name} ! </h1>
             <br>
             <h4> Welcome To Shoppy. </h4>
             <br>
             <p>Thank you for joining us </p>
             
             For any Queries, Please contact : support@shoppy.com
             <br>
             Thanks and Regards
             <br>
             Shoppy Team
             `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info);
                return res.status(200).json({ Success: info })
            }
        });


    } catch (error) {
        return res.status(400).json({ error: "Error cannot send mail" })
    }
}
