
import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    OrderId: { type: String, unique: true, default: "OrderID0" },
    Product: { type: Object, required: true },
    shippingAddress: { type: Object, required: true },
    paymentInfo: { 
        id: { type: String, required: true },
        payload: { type: Number, required: true },
        paytmCheckSum: { type: String, required: true } 
    },
    status: { type: String, default: "Pending", required: true },
    isDelivered: { type: Boolean, default: false },
    expectedDeliveryDate: { type: Date, default: () => Date.now() + 3*24*60*60*1000 }

}, { timestamps: true })


export default mongoose.models?.Order || mongoose.model("Order", OrderSchema);

