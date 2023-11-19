// /modules/categories/categories.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesController } from './categories.controller';
import { CategorySchema } from './categories.model';
import { CategoriesService } from './categories.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})

export class CategoriesModule {}
