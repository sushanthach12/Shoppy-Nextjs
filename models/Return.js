
import mongoose from "mongoose";
const { Schema } = mongoose;

const ReturnSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId }, // Which user is loggedin  ref: 'user' },
    returnId: { type: String, required: true },
    orderId: { type: String, required: true },
    query : { type: String, required: true },
    status: { type: String, default: "Pickup-Processing", required: true },
    expectedPickupDate: { type: Date, default: () => Date.now() + 3 * 24 * 60 * 60 * 1000 }
}, { timestamps: true })

export default mongoose.models?.Return || mongoose.model("Return", ReturnSchema)