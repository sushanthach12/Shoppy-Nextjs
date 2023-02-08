// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../models/User"
import connectDb from "../../middleware/connectDb"
const CryptoJS = require('crypto-js')
const JWT = require('jsonwebtoken')
import auth from "../../middleware/authUser"
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

connectDb()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await getUser(req, res)
            break;
    }
}


const getUser = async (req, res) => {

    try {
        const data = await auth(req,res)
        const userID = data._id;

        const user = await User.findById(userID).select('-password');
        return res.status(200).json({ "Success": true, User: user });
    }
    catch (err) {
        return res.status(500).json({ error: "This method is not allowed" })
    }
}
