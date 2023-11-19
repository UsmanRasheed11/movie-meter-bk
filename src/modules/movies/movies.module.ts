// /modules/movies/movies.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { MoviesController } from './movies.controller';
import { MovieSchema } from './movies.model';
import { MoviesService } from './movies.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
    UsersModule
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})

export class MoviesModule { }
