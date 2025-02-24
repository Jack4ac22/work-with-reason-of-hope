import { Schema, model, models } from "mongoose";

// Define Mongoose schema with optimized NoSQL structure
const SessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  sessionId: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true }
});
const Session = models.Session || model("Session", SessionSchema);
export default Session;