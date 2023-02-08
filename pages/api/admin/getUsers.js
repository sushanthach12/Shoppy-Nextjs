// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../../models/User"
import connectDb from "../../../middleware/connectDb"
import auth from "../../../middleware/authUser"

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
        const user = await auth(req, res)
        if(!user.isAdmin){
            return res.status(500).json({ error: "Unauthorised Personel" })
        }

        const allusers = await User.find().select('-password');
        return res.status(200).json({ "Success": true, Users: {...allusers} });
    }
    catch (err) {
        return res.status(500).json({ error: "This method is not allowed" })
    }
}
