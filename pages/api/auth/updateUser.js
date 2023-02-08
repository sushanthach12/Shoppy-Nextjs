// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../../models/User";
import connectDb from "../../../middleware/connectDb";
import auth from '../../../middleware/authUser'

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
        const authUser = await auth(req, res)
        if (!authUser) {
            return res.status(400).json({ error: "User Not Authenticated" })
        }

        let user = await User.findOne({ _id: authUser._id })
        if (!user) {
            return res.status(400).json({ error: "User Not Found" })
        }
        let upt;
        switch (req.body.type) {
            case 'userName':
                upt = await User.findByIdAndUpdate(user.id, {
                    name: req.body.data
                }).select('-password')
                break;

            case 'email':
                upt = await User.findByIdAndUpdate(user.id, {
                    email: req.body.data
                }).select('-password')
                break;

            case 'shippingAddress':
                upt = await User.findByIdAndUpdate(user.id, {
                    address: req.body.data.address[0],
                    pincode: req.body.data.pincode[0],
                    state: req.body.data.state[0],
                    country: req.body.data.country[0]
                }).select('-password')
                break;
        }

        return res.status(200).json({ "Success": true, isAdmin: user.isAdmin, User: upt });
    }
    catch (err) {
        return res.status(400).json({ error: "This method is not allowed" })
    }
}
