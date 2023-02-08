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
        
        const { title, slug, image, size, color, amount, quantity } = req.body

        let cart = await Cart.create({
            user: user._id,
            title: title,
            slug: slug,
            image: image,
            size: size,
            color: color,
            amount: amount,
            quantity: quantity
        })

        return res.status(200).json({ "Success": true, "Cart": cart });
    }
    catch (err) {
        return res.status(500).json({ error: "This method is not allowed" })
    }
}
