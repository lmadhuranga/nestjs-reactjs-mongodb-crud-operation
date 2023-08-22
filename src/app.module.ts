import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PartnerModule } from './partner/partner.module';
import { ServiceModule } from './service/service.module';
import mysqlConfig from 'mysql.config';
import mongodbConfig from 'mongodb.config';
import { Partner } from './partner/entities/partner.entity';
import { SubscribeModule } from './subscribe/subscribe.module';    
import { LogServiceService } from './log-service/log-service.service';
import { LogService } from './log-service/entities/log-service.entity';
import { LogServiceModule } from './log-service/log-service.module';
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
  ],
  providers: [],
})
export class AppModule {}
