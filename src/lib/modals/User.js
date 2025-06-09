import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    sessionid: {type: String, required: false },
}, 
{
    timestamps: true,
});
//           Look for the user   || if user doesnt exist, create a new one
const User = mongoose.models.User || mongoose.model('User', userSchema)

// creates the name of the schema inside mongoDB
export default User;