import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
    try {
        await connectToDB();
        const querySearch = new RegExp(req.url.split("q=")[1], "ig");

        const prompts = await Prompt.find({
            $or: [
                { tag: { $regex: querySearch } },
                { prompt: { $regex: querySearch } },
                { username: { $regex: querySearch } },
            ],
        }).populate({
            path: "creator",
        });

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to search!", { status: 500 });
    }
};
