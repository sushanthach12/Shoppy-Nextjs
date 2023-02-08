
import mongoose from "mongoose";
const { Schema } = mongoose;

const CartSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId}, // Which user is loggedin  ref: 'user' },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    amount: { type: Number, required: true }

}, { timestamps: true })

export default mongoose.models?.Cart || mongoose.model("Cart", CartSchema)