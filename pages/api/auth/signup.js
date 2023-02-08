// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../../models/User"
import connectDb from "../../../middleware/connectDb"
const CryptoJS = require('crypto-js')
const JWT = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET;

connectDb()

export default async(req, res) => {
    switch(req.method){
        case "POST":
            await handler(req, res)
            break;
    }
}

const handler = async (req, res) => {
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        user = await User.create({
            name: req.body.name,
            phoneNo: req.body.phoneNo,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SEC).toString()
        })

        console.log(user)
        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = JWT.sign(data, JWT_SECRET, { expiresIn: 60 * 60 * 24 * 30 });

        return res.status(200).json({ "Success": true, AuthToken : authToken , User: user});
    }
    catch(err) {
        return res.status(400).json({ error: "This method is not allowed" })
    }
}