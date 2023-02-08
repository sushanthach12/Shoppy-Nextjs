
import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	phoneNo: { type: String, required: true },
	address: { type: String, },
	pincode: { type: Number, },
	country: { type: String, default: "India"},
	state: { type: String, },
	isAdmin: { type: Boolean, default: false }
}, { timestamps: true });


export default mongoose.models?.User || mongoose.model("User", UserSchema)
