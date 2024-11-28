import mongoose from "mongoose";

const careersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const careers = mongoose.model("careers", careersSchema);
export default careers;
