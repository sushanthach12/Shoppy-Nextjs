// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../../models/Product"
import connectDb from "../../../middleware/connectDb"
import auth from '../../../middleware/authUser'

connectDb()

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            await handler(req, res)
            break;
    }
}

const handler = async (req, res) => {

    try {
        const user = await auth(req, res)
        if (user.isAdmin) {
            const { title, slug, desc, image, size, color,gender, category, price, availableQty } = req.body

            // Create a new PRoduct
            let product = await Product.create({
                title: title,
                slug: slug,
                desc: desc,
                image: image,
                size: size,
                color: color,
                gender: gender,
                category: category,
                price: price,
                availableQty: availableQty
            })

            return res.status(200).json({ "Success": true, "Product": product });
        }

        return res.status(400).json({ error: "Unauthorised access" })
    }
    catch (err) {
        return res.status(400).json({ error: "This method is not allowed" })
    }
}
