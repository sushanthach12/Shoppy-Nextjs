// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Return from "../../../models/Return"
import connectDb from "../../../middleware/connectDb"
import auth from "../../../middleware/authUser"

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
        if (!user.isAdmin) {
            return res.status(400).json({ error: "Unauthorised" })
        }
        const rid = req.headers.rid

        let ro = await Return.findOneAndUpdate({ returnId: rid }, {
            status: "Returned"
        })

        return res.status(200).json({ "Success": true, Return: ro });
    }
    catch (err) {
        return res.status(400).json({ error: "This method is not allowed" })
    }
}
