import connectToDatabase from "@/lib/db";
import User from "@/lib/modals/User";
import { NextResponse } from "next/server";
import {Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId

//GET method to return username
export const GET = async () => {
    try {
        // connects to mongoDB database
        await connectToDatabase();

        // getting variables from schema in corresponding modals
        const users = await User.find();

        // was able to find users
        return new NextResponse(JSON.stringify(users), { status: 200});
        
        // was not able to find users
    } catch (error: any) {
        return new NextResponse("Error in fetching users" + error.message, {status: 500,});
    }
};

// John: Let's you update username 
export const PATCH = async (request: Request) => {
    try {
        const body = await request.json();
        const { userId, newUsername } = body;
        await connectToDatabase();
        if (!userId || !newUsername) {
            return new NextResponse(
                JSON.stringify({message : "ID or new username not found."}), 
            { status: 400 }
            );
        }

        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({message : "Invalid User ID."}), 
            { status: 400 }
            );
        }
        const updateUser = await User.findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { username: newUsername },
            { new: true }
        );
        if (!updateUser) {
            return new NextResponse(
                JSON.stringify({ message: "User not found in the database"}),
                { status: 400}
            );
        }
        
        return new NextResponse(
            JSON.stringify({ message: "User is updated", user: updateUser }),
            { status: 200 } 
        );
    } catch (error: any){
         return new NextResponse("Error in updating user" + error.message, {
            status : 500,
         });
    }
}