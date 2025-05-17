import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  category: String,
  image: { type: String, required: false },
  rating: { type: Number, required: false },
});

export default mongoose.models.Products ||
  mongoose.model("Products", ProductsSchema);
