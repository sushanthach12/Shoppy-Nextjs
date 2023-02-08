// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../../models/Product"
import connectDb from "../../../middleware/connectDb"


connectDb()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await handler(req, res)
            break;
    }
}


const ArrangeProducts = (Products) => {

    //Can use aggregation pipeline to get the product

    let PRODUCTS = {}

    for (let item of Products) {
        if (item.title in PRODUCTS) {
            if (!PRODUCTS[item.title].slug.includes(item.slug) && item.availableQty > 0) {
                PRODUCTS[item.title].slug.push(item.slug)
            }
            if (!PRODUCTS[item.title].color.includes(item.color) && item.availableQty > 0) {
                PRODUCTS[item.title].color.push(item.color)
            }
            if (!PRODUCTS[item.title].size.includes(item.size) && item.availableQty > 0) {
                PRODUCTS[item.title].size.push(item.size)
            }
            if (!PRODUCTS[item.title].price.includes(item.price) && item.availableQty > 0) {
                PRODUCTS[item.title].price.push(item.price)
            }


        } else {
            PRODUCTS[item.title] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                PRODUCTS[item.title].slug = [item.slug];
                PRODUCTS[item.title].size = [item.size];
                PRODUCTS[item.title].color = [item.color];
                PRODUCTS[item.title].price = [item.price];
            }
        }
    }

    return PRODUCTS;
}

const handler = async (req, res) => {

    try {
        let product = await Product.aggregate([
            {
                '$match': {
                    'category': req.body.category
                }
            }
        ])
        if (!product) {
            return res.status(400).json({ error: "Sorry No products found" })
        }

        const GOODS = ArrangeProducts(product);

        return res.status(200).json({ "Success": true, "Products": GOODS });
    }
    catch(err) {
        return res.status(400).json({ error: "This method is not allowed" })
    }
}
