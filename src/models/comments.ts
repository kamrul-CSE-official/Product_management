import mongoose from "mongoose";

const CommentsSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  userId: {
    ref: "Users",
    required: false,
  },
  userName: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    required: false,
    default: "https://avatar.iran.liara.run/public/17",
  },
  comment: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Comments ||
  mongoose.model("Comments", CommentsSchema);
