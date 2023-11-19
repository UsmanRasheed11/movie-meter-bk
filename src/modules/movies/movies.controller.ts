// /modules/movies/movies.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getMovies() {
    return this.moviesService.getAllMovies();
  }

  @UseGuards(JwtAuthGuard)
  @Get('recommended')
  async getRecommendedMovies(@Req() req) {
    const userId = req.user.sub; // Extract user ID from the JWT token
    return this.moviesService.getRecommendedMovies(userId);
  }
}
