// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Return from "../../../models/Return"
import connectDb from "../../../middleware/connectDb"
import auth from "../../../middleware/authUser"
import crypto from 'crypto'

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
        if(!user){
            return res.status(400).json({ error: "Unauthorised" })
        }
        const oid = req.headers.oid
        const returnId= "ReturnID" + crypto.randomBytes(20).toString("hex");

        let ro = await Return.create({
            userId: user._id,
            returnId : returnId,
            orderId : oid,
            query : req.body
        })

        return res.status(200).json({ "Success": true, Return : ro });
    }
    catch (err) {
        return res.status(400).json({ error: "This method is not allowed" })
    }
}
