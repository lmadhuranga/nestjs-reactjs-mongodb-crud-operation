import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Todo:: configuration Move to env file
const mongodbConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default mongodbConfig;
