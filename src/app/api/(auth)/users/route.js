import connectToDatabase from "@/lib/db";
import User from "@/lib/modals/User";
import { NextResponse } from "next/server";
import {Types } from "mongoose";

const ObjectId = Types.ObjectId;



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
    } catch (error) {
        return new NextResponse("Error in fetching users" + error.message, {status: 500,});
    }
};

// John: Let's you update username 
export const PATCH = async (request) => {
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
            return new NextResponse(JSON.stringify({message : "Invalid user ID."}),
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
                JSON.stringify({ message: "user not found in the database"}),
                { status: 400}
            );
        }
        
        return new NextResponse(
            JSON.stringify({ message: "user is updated", user: updateUser }),
            { status: 200 } 
        );
    } catch (error){
         return new NextResponse("Error in updating user" + error.message, {
            status : 500,
         });
    }
}

export const DELETE = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        // check if user ID exists
        if (!userId) {
            return new NextResponse(
                JSON.stringify({ message: "ID or new username not found" }),
            );
        }
        // check if user ID is valid user
        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify( {message: "Invalid user id" }), {
                status: 400,
            });
        }
        await connectToDatabase();
        
        const deleteUser = await User.findByIdAndDelete(
            new Types.ObjectId(userId)
        );
        // check if able to check user ID and delete is possible
        if (!deleteUser) {
            return new NextResponse(
                JSON.stringify({ message: "user not found in the database" }),
                {status : 400 }
            );
        }
        //success: user ID was found connected to database and deleted user!
        return new NextResponse(
            JSON.stringify({ message: "user is deleted", user: deleteUser }),
            { status: 200 }
        );
        // error: could not delete the user
    } catch (error){
        return new NextResponse("Error in deleting user" + error.message, {
            status: 500,
        });
    }
};