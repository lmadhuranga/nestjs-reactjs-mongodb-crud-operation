import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PartnerModule } from './partner/partner.module';
import { ServiceModule } from './service/service.module';
import mysqlConfig from 'mysql.config';
import mongodbConfig from 'mongodb.config';
import { SubscribeModule } from './subscribe/subscribe.module';
import { LogServiceModule } from './log-service/log-service.module';
import { StatisticsModule } from './statistics/statistics.module';
import { JwtModule } from '@nestjs/jwt';
import { CallbacksModule } from './callbacks/callbacks.module';
import * as fs from 'fs';
import * as path from 'path'; 


@Module({
  imports: [
    JwtModule.register({
      global: true,
      publicKey: fs.readFileSync(path.join(__dirname,'../../keys/public-key.pem'), 'utf8'),
      privateKey: fs.readFileSync(path.join(__dirname,'../..//keys/private-key.pem'), 'utf8'),
      signOptions: { algorithm: 'RS256', expiresIn: '1h' },
    }),
    // TypeOrmModule.forRoot(mysqlConfig),
    TypeOrmModule.forRoot(mongodbConfig),  
    AuthModule,
    UsersModule,
    PartnerModule,
    ServiceModule,
    SubscribeModule,
    LogServiceModule,
    StatisticsModule,
    CallbacksModule,
  ],
  providers: [],
})
export class AppModule {}
