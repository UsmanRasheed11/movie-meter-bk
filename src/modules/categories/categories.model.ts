// /src/modules/categories/categories.model.ts
import { Schema, Document } from 'mongoose';

export const CategorySchema = new Schema({
  name: String,
});

export interface Category extends Document {
  name: string;
}
