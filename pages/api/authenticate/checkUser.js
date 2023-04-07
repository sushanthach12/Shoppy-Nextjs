// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../../models/User";
import connectDb from "../../../middleware/connectDb";

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

        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({ Success: true })
        }
        return res.status(400).json({ Error: true })
    }
    catch (err) {
        return res.status(500).json({ error: "This method is not allowed" })
    }
}
