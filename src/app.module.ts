// /src/app.module.ts
import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { MoviesModule } from './modules/movies/movies.module';
import { RatingsModule } from './modules/ratings/ratings.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017', {
      dbName: 'movie-meter',
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    MoviesModule,
    RatingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
