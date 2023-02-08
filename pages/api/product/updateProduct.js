// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../../models/Product"
import connectDb from "../../../middleware/connectDb"
import auth from '../../../middleware/authUser'

connectDb()

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            await handler(req, res)
            break
    }
}

const handler = async (req, res) => {

    try {
        const user = await auth(req, res)

        if (!user.isAdmin)
            return res.status(400).json({ error: "Unauthorised Access" })

        let p = await Product.findOne({ slug: req.body.slug })
        await Product.findByIdAndUpdate(p._id, {
            title: req.body.title,
            slug: req.body.slug,
            desc: req.body.desc,
            image: req.body.image,
            size: req.body.size,
            color: req.body.color,
            gender: req.body.gender,
            category: req.body.category,
            price: req.body.price,
            availableQty: req.body.availableQty
        })



        return res.status(200).json({ "Success": true });
    }
    catch (err) {
        return res.status(400).json({ error: "This method is not allowed" })
    }
}
