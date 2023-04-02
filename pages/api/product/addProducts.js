// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../../models/Product"
import connectDb from "../../../middleware/connectDb"
import auth from "../../../middleware/authUser"
import Hospitals from "../../../models/Hospitals"

connectDb()

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            await handler2(req, res)
            break;
    }
}

const handler = async (req, res) => {
    try {
        const user = await auth(req, res)
        if (!user.isAdmin)
            return res.status(400).json({ error: "unauthorised Access" })

        const products = await Product.insertMany(req.body)

        return res.status(200).json({ "Success": true });
    }
    catch (err) {
        return res.status(400).json({ error: "This method is not allowed" })
    }
}

const handler2 = async (req, res) => {
    try {
        const user = await auth(req, res)
        if (!user.isAdmin) {
            return res.status(400).json({ error: "unauthorised Access" })
        }
        console.log(req.body)

        // for (let i = 0; i < req.body.length; i++) {
        //     if(req.body[i].State== "Karnataka"){
        //         let data = {
        //             name : req.body[i].name,
        //             state: req.body[i].State,
        //             city : req.body[i].City,
        //             address: req.body[i].LocalAddress,
        //             pincode : req.body[i].Pincode
        //         }
        //         await Hospitals.create(data)
        //     }
        // }

        const hos = await Hospitals.insertMany(req.body)

        return res.status(200).json({ "Success": true });
    }
    catch (err) {
        return res.status(400).json({ error: "This method is not allowed" })
    }
}
