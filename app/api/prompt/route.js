import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDB();
        const allPrompts = await Prompt.find({}).populate("creator");

        return NextResponse.json(allPrompts, { status: 200 });
    } catch (error) {
        return NextResponse("Failed to fetch all prompts", { status: 500 });
    }
};
