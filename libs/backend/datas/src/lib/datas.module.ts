import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './test/entity/test.entity';
import { TestModule } from './test/test.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env['DB_HOST'],
        port: process.env['DB_PORT'] ? parseInt(process.env['DB_PORT']) || 3306 : 3306,
        username: process.env['DB_USER'],
        password: process.env['DB_PASSWORD'],
        database: process.env['DB_NAME'],
        entities: [Test],
        synchronize: true,
      })
    }),
    TestModule,
  ],
})
export class DatasModule {}
