// /src/modules/users/users.model.ts
import { Schema, Document } from 'mongoose';
import { Category } from '../categories/categories.model';

export const UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  name: String,
  address: String,
  dob: Date,
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
});

export interface User extends Document {
  username: string;
  password: string;
  name: string;
  address: string;
  dob: Date;
  categories: Category['_id'][];
}
