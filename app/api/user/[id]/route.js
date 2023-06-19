import User from "@models/user";
import { NextResponse } from "next/server";

export const GET = async (req, context) => {
    try {
        const { id } = context.params;
        const userInfo = await User.findById(id);

        return NextResponse.json(userInfo, { status: 200 });
    } catch (error) {
        console.log(error);
    }
};
