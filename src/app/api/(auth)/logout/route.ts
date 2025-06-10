import connectToDatabase from "@/lib/db";
import User from "@/lib/modals/User";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import clientPromise from '@/lib/db';
import { clearSessionCookie } from "@/lib/auth";

const ObjectId = require("mongoose").Types.ObjectId

// export const DELETE = async (request: Request) => {
//     try {
//         // check if user email exists
//         const { searchParams } = new URL(request.url);
//         const userEmail = searchParams.get("email");
//         if (!userEmail) {
//             return new NextResponse(
//                 JSON.stringify({ message: "User email not found" }),
//             );
//         }
        
//         // connect to database
//         await connectToDatabase();
//         const deleteSessionId = await User.findBy 

//     } catch(error: any) {

//     }
// }

// export async function POST(request: Request) {
//     const cookieStore = cookies();
//     const sessionId = (await cookies()).get('sessionId')?.value;
//    try {
//      // check if sessionId exists
//     if(!sessionId) {
//         return NextResponse.json({ message: 'No active session' }, 
//             {
//                 status: 400,
//             }
//         );
//     }
//      // Connect to MongoDB
//     connectToDatabase();
//     const deleteSessionId = await User.findByIdAndDelete(
//         new Types.ObjectId(sessionId)
//     );
//     if (!deleteSessionId) {
//         return new NextResponse(
//             JSON.stringify({ message: "Session not found" }),
//              {status: 400 }
//         );
//     }
//     (await cookieStore).set('sessiondId','',{
//         httpOnly:true,
//         path:'/',
//         maxAge: 0,
//     });
//     return new NextResponse(
//         JSON.stringify({ message: "Session deleted!", user: deleteSessionId }),
//         { status: 200 },
//     );
//    } catch(error: any) {
//         return new NextResponse("Error in deleting session for user" + error.message, {
//             status: 500,
//         });
//    }
// };

export async function POST() {
    const sessionId = (await cookies()).get('sessionId')?.value;
    if (!sessionId) return NextResponse.json({ message: 'No session' });
    connectToDatabase();
    // const userExists = await User.findOne({ "sessionid" : sessionId });
    const userExists = await User.updateOne(
        { "sessionid": sessionId },
        { $unset: {sessionid: '' } }
    );

    console.log(userExists);
    clearSessionCookie();
    console.log("loggedouttttttttttttttttt" + sessionId);
   return NextResponse.json({ message: "Logged out" });
}