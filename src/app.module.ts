import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { PartnerModule } from './partner/partner.module';
import { ServiceModule } from './service/service.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { SubscriptionLogModule } from './subscription-log/subscription-log.module';
import mysqlConfig from 'mysql.config';
import mongodbConfig from 'mongodb.config';
import { Subscribe } from './subscribe/entities/subscribe.entity';
import { Partner } from './partner/entities/partner.entity';


@Module({
  imports: [
    // TypeOrmModule.forRoot(mysqlConfig),
    TypeOrmModule.forRoot(mongodbConfig), 
    AuthModule,
    UsersModule,
    SubscribeModule,
    PartnerModule,
    ServiceModule,
    SubscriptionModule,
    SubscriptionLogModule,
  ],
})
export class AppModule {}
