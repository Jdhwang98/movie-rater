import connectToDatabase from "@/lib/db";
import User from "@/lib/modals/user";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

// Simply checks if the user is logged in or not
export const GET = async(req) => {
    const sessionId = (await cookies()).get('sessionid')?.value;
    if(sessionId) {
        await connectToDatabase();
        const user = await User.findOne({"sessionid" : sessionId});
        const username = user.name;
        return NextResponse.json({result : true, username: username});
    }else {
        return NextResponse.json({result :  false});
    }
  
}
