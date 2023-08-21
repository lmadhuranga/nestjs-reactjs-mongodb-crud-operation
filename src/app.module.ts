import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { PartnerModule } from './partner/partner.module';
import { ServiceModule } from './service/service.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { SubscriptionLogModule } from './subscription-log/subscription-log.module';
import { StatisticModule } from './statistic/statistic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    SubscribeModule,
    PartnerModule,
    ServiceModule,
    SubscriptionModule,
    SubscriptionLogModule,
    StatisticModule,
  ],
})
export class AppModule {}
