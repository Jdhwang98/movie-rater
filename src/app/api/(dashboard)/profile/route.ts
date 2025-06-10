import { NextResponse } from "next/server";
import { Types } from "mongoose";
import connectToDatabase from "@/lib/db";
import User from "@/lib/modals/User";

export const GET = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse (
                JSON.stringify({ message: "Invalid or missing userId" }),
                {
                    status: 400,
                }
            );
        }
        await connectToDatabase();

        const user = await User.findById(userId);
        if (!user) {
            return new NextResponse(
                JSON.stringify({ meesage: "user not found in the database" }),
                {
                    status: 400,
                }
            );
        }

    } catch (error: any) {

    }
}