// ratings.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingsController } from './ratings.controller';
import { RatingSchema } from './ratings.model';
import { RatingsService } from './ratings.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }])],
  controllers: [RatingsController],
  providers: [RatingsService],
  exports: [RatingsService],
})

export class RatingsModule {}
