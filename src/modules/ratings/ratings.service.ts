// /src/modules/ratings/ratings.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating } from './ratings.model';

@Injectable()
export class RatingsService {
  constructor(@InjectModel('Rating') private readonly ratingModel: Model<Rating>) {}

  async rateMovie(userId: string, movieId: string, ratingValue: number): Promise<Rating> {
    if (ratingValue < 1 || ratingValue > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }
    const existingRating = await this.ratingModel.findOne({ user: userId, movie: movieId }).exec();

    if (existingRating) {
      // Update the existing rating
      existingRating.rating = ratingValue;
      return existingRating.save();
    }

    // Create a new rating if the user has not rated the movie yet
    const newRating = new this.ratingModel({
      user: userId,
      movie: movieId,
      rating: ratingValue,
    });

    return newRating.save();
  }

  async getRatingsByUser(userId: string): Promise<Rating[]> {
    return this.ratingModel.find({ user: userId }).populate('movie').exec();
  }

  async getAverageRatingByMovie(movieId: string): Promise<number> {
    const ratings = await this.ratingModel.find({ movie: movieId }).exec();

    if (ratings.length === 0) {
      return 0; // Return 0 if there are no ratings yet
    }

    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return totalRating / ratings.length;
  }

  async deleteRating(userId: string, movieId: string): Promise<void> {
    const result = await this.ratingModel.deleteOne({ user: userId, movie: movieId }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Rating not found');
    }
  }
}
