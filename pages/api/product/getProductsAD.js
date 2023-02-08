// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../../models/Product"
import connectDb from "../../../middleware/connectDb"
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
        const user = await auth(req, res)
        if(!user.isAdmin)
            return res.status(400).json({ error: "Unauthorised Access" })

        let products = await Product.find().sort({"createdAt": -1})
        if (!products) {
            return res.status(400).json({ error: "Sorry No products found" })
        }

        return res.status(200).json({ "Success": true, "Products": {...products} });
    }
    catch(err) {
        return res.status(400).json({ error: "This method is not allowed" })
    }
}
