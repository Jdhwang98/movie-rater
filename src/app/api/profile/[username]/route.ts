import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/lib/modals/User";

export async function GET(req: Request, { params }: {params: { userName: string }}) {
    try {
       connectToDatabase();
       const { userName } = params;
       if (!userName) {
        return NextResponse.json({ error: "User ID is required "}, {status: 400});
       }
       const user = await User.findById(userName).select('-password');
       if (!user) {
        return NextResponse.json({ error: "User not found "}, {status: 404});
       }
       return NextResponse.json(user);
    } catch(err: any) {
        return NextResponse.json({ error: err.message}, {status: 500});
    }
}