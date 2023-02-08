// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../../models/User";
import connectDb from "../../../middleware/connectDb";

const CryptoJS = require('crypto-js')
const JWT = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET;

connectDb()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await handler(req, res)
            break;
    }
}


const handler = async (req, res) => {
    try {

        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: "Please Login with correct credentials" })
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.AES_SEC);
        const password = hashedPassword.toString(CryptoJS.enc.Utf8)

        if (password !== req.body.password) {
            return res.status(400).json({ error: "Please enter correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = JWT.sign(data, JWT_SECRET, { expiresIn: 60 * 60 * 24 * 30 });

        return res.json({ "Success": true , AuthToken : authToken , isAdmin: user.isAdmin , User: user});
    }
    catch(err) {
        return res.status(400).json({ error: "This method is not allowed" })
    }
}
