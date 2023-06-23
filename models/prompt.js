import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    prompt: {
        type: String,
        required: [true, "Prompt is required"],
        text: true,
    },
    tag: {
        type: String,
        required: [true, "Tag is required"],
        text: true,
    },
    username: {
        type: String,
        required: [true, "username is required"],
        text: true,
    },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
