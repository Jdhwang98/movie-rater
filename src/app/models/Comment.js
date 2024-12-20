import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    movieId: { type: String, required: true },
    user: { type: String, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
