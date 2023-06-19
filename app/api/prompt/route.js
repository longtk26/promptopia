import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        await connectToDB();
        const allPrompts = await Prompt.find();

        return NextResponse.json(allPrompts);
    } catch (error) {}
};
