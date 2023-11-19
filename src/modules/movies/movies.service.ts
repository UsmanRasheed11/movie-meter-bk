import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { Movie } from './movies.model';

@Injectable()
export class MoviesService {
  constructor(@InjectModel('Movie') private readonly movieModel: Model<Movie>,
  private readonly usersService: UsersService
  ) {}

  async seedMovies(movies: any[]) {
    return this.movieModel.create(movies);
  }

  async getAllMovies() {
    return this.movieModel.find().populate('category').exec();
  }

  async getRecommendedMovies(userId: string): Promise<Movie[]> {

    const user = await this.usersService.getUserById(userId);
    // Fetch movies based on the user's categories and order them by createdAt in descending order
    return this.movieModel
      .find({ category: { $in: user.categories } }).populate('category') // Replace userCategories with the actual user's categories
      .sort({ createdAt: -1 })
      .exec();
  }

  async getMoviesByCategory(categoryId: string) {
    return this.movieModel.find({ category: categoryId }).populate('category').exec();
  }
}
