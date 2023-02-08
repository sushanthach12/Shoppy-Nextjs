// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cart from "../../../models/Cart"
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
        let dlt = await Cart.deleteMany({user: user._id})

        res.json({ "Success": true });
    }
    catch (err) {
        return res.status(500).json({ error: "This method is not allowed" })
    }
}
