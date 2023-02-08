// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../../models/Product"
import connectDb from "../../../middleware/connectDb"

const handler = async (req, res) => {

    if (req.method == 'POST') {
        const product = await Product.aggregate([
            {
                '$match': {
                    'slug': req.body.slug
                }
            }
        ]);
        const products = await Product.find({ 'title': product[0].title });

        let variants = {};

        for (let item of products) {
            if (Object.keys(variants).includes(item.color)) {
                variants[item.color][item.size] = {
                    "slug": item.slug
                }
            } else {
                variants[item.color] = {};
                variants[item.color][item.size] = {
                    "slug": item.slug,
                }
            }
        }

        return res.status(200).json({ "Success": true, "Product": product[0], "Variants": variants });
    }
    else{
        return res.status(400).json({ error: "This method is not allowed" })
    }
}


export default connectDb(handler);