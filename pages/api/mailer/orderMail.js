import OrderMail from '../../../components/Mailer/OrderMail';
const fs = require('fs/promises')

const nodemailer = require('nodemailer')

export default handler = async (req, res) => {
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

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASS
            }
        });

        // const TEMPLATE = await fs.readFile('../views/orderMail.html', "utf-8")
        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: 'steamsush12@gmail.com',
            subject: 'Test Email',
            html: {path : 'D://Code/Miniproject/ecomm/pages/views/orderMail.html'}
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info);
                return res.status(200).json({ Success: true })
            }
        });


    } catch (error) {
        return res.status(400).json({ error: "Error cannot send mail" })
    }
}
