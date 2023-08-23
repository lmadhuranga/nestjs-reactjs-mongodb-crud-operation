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
@Module({
  imports: [
    // TypeOrmModule.forRoot(mysqlConfig),
    TypeOrmModule.forRoot(mongodbConfig), 
    AuthModule,
    UsersModule,
    PartnerModule,
    ServiceModule,
    SubscribeModule,
    LogServiceModule,
    StatisticsModule,
  ],
  providers: [],
})
export class AppModule {}
