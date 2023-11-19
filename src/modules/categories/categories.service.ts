import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './categories.model';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

  async seedCategories(categories: string[]): Promise<Category[]> {
    const categoryDocs = categories.map(name => ({ name }));
    return this.categoryModel.create(categoryDocs);
  }

  async getAllCategories() {
    return this.categoryModel.find().exec();
  }
}