import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
