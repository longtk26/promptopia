import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
    try {
        await connectToDB();
        console.log(req.url);
        const allPrompts = await Prompt.find({}).populate("creator");

        return new Response(JSON.stringify(allPrompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};
