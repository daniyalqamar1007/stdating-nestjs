import { Schema, Document } from 'mongoose';

export enum Role {
  USER = 'User',
  ADMIN = 'Admin',
}

// Export User interface for typing
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  iam?: string;
  lookingFor?: string[];
  relationShipGoal?: string;
  flyToMeet?: boolean;
  preferredAge?: {
    min?: number;
    max?: number;
  };
  height?: string;
  age?: number;
  ethnicity?: string;
  location?: string;
  healthCondition?: string[];
  aboutYourSelf?: string;
  aboutYourMatch?: string;
  interests?: string[];
  sexualOrientation?: string;
  photos?: string[];
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    iam: { type: String },
    lookingFor: { type: [String] },
    relationShipGoal: { type: String },
    flyToMeet: { type: Boolean },
    preferredAge: {
      min: {
        type: Number,
        min: 18,
        required: false,
      },
      max: {
        type: Number,
        max: 100,
        required: false,
      },
    },
    height: { type: String },
    age: { type: Number },
    ethnicity: { type: String },
    location: { type: String },
    healthCondition: { type: [String] },
    aboutYourSelf: { type: String },
    aboutYourMatch: { type: String },
    interests: { type: [String] },
    sexualOrientation: { type: String },
    photos: { type: [String] },
    role: { type: String, enum: Role, default: Role.USER },
  },
  { timestamps: true },
);

// Optional: Validation to ensure min ≤ max
UserSchema.pre('save', function (next) {
  const age = this.preferredAge;
  if (age?.min != null && age?.max != null && age.min > age.max) {
    return next(
      new Error('preferredAge.min cannot be greater than preferredAge.max'),
    );
  }
  next();
});
