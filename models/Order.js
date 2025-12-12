import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String }, // optional: store user if logged in

    gameSlug: String,
    itemSlug: String,
    itemName: String,
    playerId: String,
    zoneId: String,

    paymentMethod: String,
    price: Number,

    email: { type: String, sparse: true },
    phone: { type: String, sparse: true },

    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    expiresAt: { type: Date }, // auto-mark as failed after 30 min
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
