// /src/modules/ratings/ratings.controller.ts
import { Controller, Post, Get, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':movieId/:ratingValue')
  async rateMovie(@Req() req, @Param('movieId') movieId: string, @Param('ratingValue') ratingValue: number) {
    const userId = req.user.sub; // Extract user ID from the JWT payload
    return this.ratingsService.rateMovie(userId, movieId, ratingValue);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getRatingsByUser(@Req() req) {
    const userId = req.user.sub; // Extract user ID from the JWT payload
    return this.ratingsService.getRatingsByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('average/:movieId')
  async getAverageRatingByMovie(@Param('movieId') movieId: string) {
    return this.ratingsService.getAverageRatingByMovie(movieId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':movieId')
  async deleteRating(@Req() req, @Param('movieId') movieId: string) {
    const userId = req.user.sub; // Extract user ID from the JWT payload
    return this.ratingsService.deleteRating(userId, movieId);
  }
}
