import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const mongodbConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: '127.0.0.1',
  port: 27017,
  database: 'test',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default mongodbConfig;
