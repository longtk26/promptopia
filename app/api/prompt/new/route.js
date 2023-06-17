import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    try {
        await connectToDB();
        const { id, prompt, tag } = await req.json();
        await Prompt.create({ creator: id, prompt, tag });

        return new Response({
            status: 201,
        });
    } catch (error) {
        return new Response("Failed to create new prompt", { status: 500 });
    }
};
