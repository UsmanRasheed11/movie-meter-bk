// /src/modules/movies/movies.model.ts
import { Schema, Document } from 'mongoose';
import { Category } from '../categories/categories.model';

export const MovieSchema = new Schema({
  title: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
});

export interface Movie extends Document {
  title: string;
  category: Category['_id'];
}
