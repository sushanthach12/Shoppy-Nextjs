// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import auth from '../../middleware/authUser'
// import transporter from '../../lib/nodemailer';
import { SMTPClient } from 'emailjs';

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            await handler(req, res);
            break;

        default: () => { return res.status(400).json({ error: 'Bad Request' }) }
    }
}

const handler = async (req, res) => {
    try {
        const user = await auth(req, res)
        const data = req.body

        if (!data.name || !data.email || !data.message) {
            return res.status(400).json({ error: 'Invalid Message' })
        }

        // const mailOptions = {
        //     from: process.env.NODEMAILER_EMAIL,
        //     to: data.email[0]
        // }

        // try {
        //     await transporter.sendMail({
        //         ...mailOptions,
        //         subject: data.subject[0],
        //         text: data.message[0],
        //         html: "<h1>Test Email</h1>"
        //     });

        //     return res.status(200).json({ Success: true })

        // } catch (error) {
        //     res.status(400).json({ error: 'Email Cannot be sent' })
        // }

        const client = new SMTPClient({
            user: process.env.EMAIL,
            password: process.env.PASS,
            host: 'smtp.gmail.com',
            ssl: true
        });

        try {
            const message = await client.sendAsync({
                from: process.env.EMAIL,
                to: data.email[0],
                subject: 'testing emailjs',
                text: `Just for testing purpose`
            })
        }
        catch (e) {
            res.status(400).end(JSON.stringify({ message: "Error" }))
            return;
        }


    } catch (error) {
        res.status(400).json({ error: 'Bad Request' })
    }
}
