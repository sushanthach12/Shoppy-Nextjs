const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String
    },
    state : {
        type: String,
        required: true
    },
    city : {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true
    }
},
        {
        timestamps: true,
    }
);

export default mongoose.models?.Hospitals || mongoose.model("Hospitals", HospitalSchema)

