// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from "../../../models/Order"
import connectDb from "../../../middleware/connectDb"
import auth from "../../../middleware/authUser"
import Product from "../../../models/Product"

connectDb()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await handler(req, res)
            break;
    }
}

const updateQTY = async (id, quantity) => {
    const product = await Product.findById(id)

    let qty = product.availableQty - quantity

    if(qty < 0){
        qty = 0
    }

    await Product.findByIdAndUpdate(id, {
        availableQty: qty
    })
}


const handler = async (req, res) => {
    try {
        const user = await auth(req, res)

        if(!user){
            return res.status(400).json({ error: "User Not Authenticated" })
        }

        const oid = req.headers.oid

        const orders = await Order.findOne({'OrderId' : oid})
        if(!orders.isDelivered)
            return res.status(200).json({ error: "Order not yet Delivered" })

        for(let i=0; i< orders.Product.length; i++){
            console.log(orders.Product[i]);
            await updateQTY(item._id, item.quantity)
        }

        return res.json({ "Success": true});
    }
    catch (err) {
        return res.status(500).json({ error: "This method is not allowed" })
    }
}
