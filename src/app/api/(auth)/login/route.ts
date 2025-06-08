import User from "../../../../lib/modals/User";
import connectToDatabase from "../../../../lib/db";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';


//post method because we are passing data
export async function POST(request: Request) {
    try {
        connectToDatabase(); //connect to database
        const { email, password } = await request.json() //extract input fields from request
        const userExists = await User.findOne({ email }) //find user based on email
        if (!userExists) { //if user doesnt exist
            return NextResponse.json({ error: "User doesnt exist" })
        }
        //hash the password
        const checkPassword = await bcrypt.compare(password, userExists.password)

        if (!checkPassword) { //if both passwords dont match
            return NextResponse.json({ error: "Wrong password", status: 404 })
        }
        const sessionId = randomUUID();
        console.log("HELLO " + sessionId);
        const response = NextResponse.json({ message: "success" }, { status: 201 })

        response.cookies.set('sessionid', sessionId, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 // 1 day
        })
        return response;
    } catch (err: any) {
        return NextResponse.json({ error: err.message, status: 500 })
    }
};

