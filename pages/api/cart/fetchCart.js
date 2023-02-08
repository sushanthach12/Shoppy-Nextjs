
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cart from "../../../models/Cart"
import connectDb from "../../../middleware/connectDb"
import auth from "../../../middleware/authUser"

connectDb()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await fetchCart(req, res)
            break;
    }
}


const fetchCart = async (req, res) => {

    try {
        const user = await auth(req, res)

        const cart = await Cart.find({ user: user._id })

        let subTotal = 0;
        let CartItems = {};
        for (let item of cart) {
            subTotal = subTotal + (item.amount * item.quantity)

            if (Object.keys(CartItems).includes(item.slug)) {
                CartItems[item.slug].quantity += item.quantity
            } else {
                CartItems[item.slug] = {}
                CartItems[item.slug] = JSON.parse(JSON.stringify(item))
            }
        }

        return res.json({ "Success": true, "Cart": CartItems, "SubTotal": subTotal });
    }
    catch {
        return res.status(500).json({ error: "This method is not allowed" })
    }
}


