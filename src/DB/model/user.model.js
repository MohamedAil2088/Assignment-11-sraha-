import mongoose from "mongoose";
import { GenderEnum, RoleEnum } from "../../enum/index.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 2,
      maxLength: 25,
      required: true,
      alias: 'fristName',
    },
    lastName: {
      type: String,
      minLength: 2,
      maxLength: 25,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    DOB: Date,
    confirmEmail: Date,
    image: String,
    coverImage: [String],
    gender: {
      type: Number,
      enum: Object.values(GenderEnum),
      default: GenderEnum.MALE,
    },
    role: {
      type: Number,
      enum: Object.values(RoleEnum),
      default: RoleEnum.USER,
    },
    changeCredentialTime: Date,
    twoStepVerification: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    strict: true,
    strictQuery: true,
    autoIndex: true,
  
  },
);

userSchema.virtual("username").set(function (value) {
  const [firstName, lastName] = value?.split(" ") || [];
  this.set({ firstName, lastName });
}).get(function () {
  return `${this.firstName || this.fristName || ''} ${this.lastName || ''}`.trim();
});

export const UserModel =
  mongoose.model.user || mongoose.model("user", userSchema);
