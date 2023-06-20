import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (_, context) => {
    try {
        await connectToDB();
        const { id } = context.params;
        const userPrompts = await Prompt.find({ creator: id });

        return NextResponse.json(userPrompts, { status: 200 });
    } catch (error) {
        return NextResponse("Failed to get prompts of user", { status: 500 });
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
