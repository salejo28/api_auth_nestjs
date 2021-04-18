import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import {ConfigService} from '@nestjs/config'

@Module({
    imports: [
        MongooseModule.forRootAsync({
            connectionName: 'auth',
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_AUTH_URI'),
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: true
            }),
            inject: [ConfigService]
        }),
        MongooseModule.forRootAsync({
            connectionName: 'products',
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_PRODUCTS_URI'),
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: true
            }),
            inject: [ConfigService]
        }),
    ],
})
export class MongoModule {}
