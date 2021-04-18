import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { MongoModule } from './database/mongo.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ApiModule, 
    MongoModule, 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
  ],
})
export class AppModule {}
