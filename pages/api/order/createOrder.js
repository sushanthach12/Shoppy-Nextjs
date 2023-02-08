// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from "../../../models/Order"
import connectDb from "../../../middleware/connectDb"
import auth from "../../../middleware/authUser"
import crypto from 'crypto'

connectDb()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await createOrder(req, res)
            break;
    }
}


const createOrder = async (req, res) => {

    try {
        const user = await auth(req, res)

        const OrderId = "OrderID" + crypto.randomBytes(16).toString("hex");

        const order = await Order.create({
            userId: user._id,
            OrderId: OrderId,
            Product: req.body.Product,
            shippingAddress: req.body.shippingAddress,
            paymentInfo: {
                id: "paytm" + OrderId,
                payload: req.body.subTotal,
                paytmCheckSum: crypto.randomBytes(16).toString("hex")
            },
            status: req.body.status
        })

        return res.json({ "Success": true, "Order": order });
    }
    catch (err) {
        return res.status(500).json({ error: "This method is not allowed" })
    }
}
