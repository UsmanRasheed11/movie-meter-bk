// /src/modules/ratings/ratings.model.ts
import { Schema, Document } from 'mongoose';
import { Movie } from '../movies/movies.model';
import { User } from '../users/users.model';

export const RatingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  movie: { type: Schema.Types.ObjectId, ref: 'Movie' },
  rating: Number,
}, { timestamps: true });

export interface Rating extends Document {
  user: User['_id'];
  movie: Movie['_id'];
  rating: number;
}
