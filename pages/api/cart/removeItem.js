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
        const slug = req.headers.slug
        // let cart = await Cart.find({user: user._id, slug : slug})
        let dlt = await Cart.deleteOne({user: user._id, slug : slug})
        
        res.json({ "Success": true });
    }
    catch (err) {
        return res.status(500).json({ error: "This method is not allowed" })
    }
}
