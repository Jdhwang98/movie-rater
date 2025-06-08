import User from "@/lib/modals/User";
import connectToDatabase from "../../../../lib/db";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

//post method because we are passing data
export async function POST(request) {
    try {
        connectToDatabase(); //connect to database
        const { name, email, password } = await request.json() //extract input fields from request
        const userExists = await User.findOne({ email }) //find user based on email
        if (userExists) { //if user exist
            return NextResponse.json({ error: "User already exists" })
        }
        //hash the password
        const hashpassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password: hashpassword
        })
        await newUser.save()

        return NextResponse.json({ message: "Thank you for registering", status: 201 })
    } catch (err) {
        return NextResponse.json({ error: err.message, status: 500 })
    }
}