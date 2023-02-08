// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from "../../../models/Order"
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

        const order = await Order.find({ userId: user._id }).sort({'createdAt' : -1})

        return res.status(200).json({ "Success": true, "Orders": { ...order } });
    }
    catch (err) {
        return res.status(400).json({ error: "This method is not allowed" })
    }
}
