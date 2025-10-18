import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("👍mongo is connected")
    } catch (error) {
        console.error("😒Mongodb connection error", error)
        process.exit(1)

    }


}


export default connectDB