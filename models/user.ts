import mongoose from "mongoose"
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "organizer", "participant"],
    default: "participant",
  },
  emailVerified: Date,
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  }],
  registeredEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  }],
}, {
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User
