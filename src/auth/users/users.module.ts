import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Users",
        schema: UserSchema
      }
    ], 'auth')
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
