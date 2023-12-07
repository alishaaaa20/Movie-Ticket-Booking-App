import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  gender: { type: String, enum: ["male", "female", "other"] },
 
});

export default mongoose.model("User", userSchema);
