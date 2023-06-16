import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    if (isConnected) {
        console.log("Mongodb is connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;

        console.log("Mongodb is connected");
    } catch (error) {
        console.log(error);
    }
};
