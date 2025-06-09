import connectToDatabase from "@/lib/db";
import User from "@/lib/modals/User";
import { NextResponse } from "next/server";
import {Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId
import { cookies } from 'next/headers';

// Simply checks if the user is logged in or not
export const GET = async(req) => {
    const sessionId = cookies().get('sessionid')?.value;
    if(sessionId) {
        return NextResponse.json({result : "true"});
    }else {
        return NextResponse.json({result :  "false"});
    }
  
}
