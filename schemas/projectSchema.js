import mongoose from "mongoose";

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    users: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        role: String, // Store the role for each user
      },
    ],
    apiCall: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);


export default projectSchema

