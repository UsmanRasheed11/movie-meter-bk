// seed-data.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { CategoriesService } from '../src/modules/categories/categories.service';
import { MoviesService } from '../src/modules/movies/movies.service';
import { UsersService } from '../src/modules/users/users.service';
import * as bcrypt from 'bcrypt';

async function seedData() {
  const app = await NestFactory.create(AppModule);

  // Inject services
  const categoriesService = app.get(CategoriesService);
  const moviesService = app.get(MoviesService);
  const usersService = app.get(UsersService);

  // Seed categories
  const categories = ['Action', 'Horror', 'Comedy', 'Animated'];
  const seededCategories = await categoriesService.seedCategories(categories);

  // Seed movies for each category
  const moviesPerCategory = [
    { title: 'Movie 1A', category: seededCategories[0]._id },
    { title: 'Movie 2A', category: seededCategories[0]._id },
    { title: 'Movie 1H', category: seededCategories[1]._id },
    { title: 'Movie 2H', category: seededCategories[1]._id },
    { title: 'Movie 1C', category: seededCategories[2]._id },
    { title: 'Movie 2C', category: seededCategories[2]._id },
    { title: 'Movie 1An', category: seededCategories[3]._id },
    { title: 'Movie 2An', category: seededCategories[3]._id },
  ];
  await moviesService.seedMovies(moviesPerCategory);

  // Seed users with different categories
  const users = [
    {
      username: 'user1',
      password: await bcrypt.hash('password1', 10),
      name: 'User1',
      address: 'Address1',
      image: 'Image1',
      dob: new Date('1990-01-01'),
      categories: [seededCategories[0]._id, seededCategories[2]._id],
    },
    {
      username: 'user2',
      password:  await bcrypt.hash('password2', 10),
      name: 'User2',
      address: 'Address2',
      image: 'Image2',
      dob: new Date('1985-05-15'),
      categories: [seededCategories[1]._id, seededCategories[3]._id],
    },
  ];
  await usersService.seedUsers(users);

  await app.close();
}

seedData().then(() => process.exit(0)).catch(err => {
  console.error(err);
  process.exit(1);
});
