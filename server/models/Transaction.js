import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    {
        userId: String,
        cost: String,
        products: {
            type: [mongoose.Types.ObjectId],
            of: Number,
        }
    },
    { timestamps: true }
);
const Product = mongoose.model("Transaction", TransactionSchema);
export default Product;