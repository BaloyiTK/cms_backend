import mongoose from "mongoose";
import bcrypt from "bcrypt";

const roleSchema = mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project', // Assuming you have a Project schema
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "field is required"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    apiKey: {
      type: String,
      required: false,
    },
    roles: [roleSchema], // Array to store project-specific roles
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const saltRounds = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, saltRounds);
  this.password = hashedPassword;
  next();
});

export default userSchema;
