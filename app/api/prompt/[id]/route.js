import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (_, context) => {
    try {
        await connectToDB();
        const { id } = context.params;
        const userPrompts = await Prompt.find({ creator: id });

        // If pass userId will res all prompts that user created
        // Otherwise will res one prompt
        if (userPrompts?.length === 0) {
            const prompt = await Prompt.findOne({ _id: id });

            return NextResponse.json(prompt, { status: 200 });
        } else {
            return NextResponse.json(userPrompts, { status: 200 });
        }
    } catch (error) {
        return NextResponse("Failed to get prompts of user", { status: 500 });
    }
};

export const PUT = async (req) => {
    try {
        await connectToDB();
        const { id, prompt, tag } = await req.json();

        await Prompt.updateOne({ _id: id }, { prompt: prompt, tag: tag });

        return new NextResponse("Update successfully!", { status: 200 });
    } catch (error) {
        console.log(error);
        return new NextResponse("Failed to updated!", { status: 500 });
    }
};

export const DELETE = async (_, context) => {
    try {
        await connectToDB();
        const { id } = context.params;
        await Prompt.deleteOne({ _id: id });

        return new NextResponse("Deleted prompt!", { status: 200 });
    } catch (error) {
        return new NextResponse("Failed to delete prompt", { status: 500 });
    }
};
