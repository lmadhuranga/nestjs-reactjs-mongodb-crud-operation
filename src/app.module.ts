import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PartnerModule } from './partner/partner.module';
import { ServiceModule } from './service/service.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { SubscriptionLogModule } from './subscription-log/subscription-log.module';
import mysqlConfig from 'mysql.config';
import mongodbConfig from 'mongodb.config';


@Module({
  imports: [
    // TypeOrmModule.forRoot(mysqlConfig),
    TypeOrmModule.forRoot(mongodbConfig), 
    AuthModule,
    UsersModule,
    PartnerModule,
    ServiceModule,
    SubscriptionModule,
    SubscriptionLogModule,
  ],
})
export class AppModule {}
