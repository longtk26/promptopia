import Prompt from "@models/prompt";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const allPrompts = await Prompt.find({}).populate("creator");

        return new Response(JSON.stringify(allPrompts), { status: 200 });
    } catch (error) {
        return NextResponse("Failed to fetch all prompts", { status: 500 });
    }
};
