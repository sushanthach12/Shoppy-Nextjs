import mongoose from "mongoose";
mongoose.set('strictQuery', false);

const connectDb = async (req, res) => {
    if (mongoose.connections[0].readyState) {
        console.log('Already connected.')
        return;
    }
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err) throw err;
        console.log('Connected to mongodb.')
    })
}


export default connectDb;