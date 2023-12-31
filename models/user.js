import { Schema, model, models } from "mongoose";

const UserShema = new Schema({
    email: {
        type: String,
        uniqued: [true, "Email is already exists"],
        required: [true, "Email is required!"],
    },
    username: {
        type: String,
        required: [true, "Username is required!"],
    },
    image: {
        type: String,
    },
});

const User = models.User || model("User", UserShema);

export default User;
