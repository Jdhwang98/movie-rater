import connectToDatabase from "../../../lib/db";
import Comment from "../../../lib/modals/Comment";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        connectToDatabase();
        const { movieId, user, comment } = await request.json(); //input data

        if (!movieId || !user || !comment) {
            return NextResponse.json({ error: "All fields are required", status: 400 });
        }

        const newComment = new Comment({ movieId, user, comment });
        await newComment.save();

        return NextResponse.json({ message: "Comment added successfully", status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err.message, status: 500 });
    }
}

export async function GET(request) {
    try {
        connectToDatabase();
        const { searchParams } = new URL(request.url);
        const movieId = searchParams.get("movieId");

        if (!movieId) {
            return NextResponse.json({ error: "Movie ID is required", status: 400 });
        }

        const comments = await Comment.find({ movieId }).sort({ createdAt: -1 });//get the comments my movie ID
        return NextResponse.json(comments);
    } catch (err) {
        return NextResponse.json({ error: err.message, status: 500 });
    }
}
