import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './test/entity/test.entity';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'mysmartfamily',
      password: '6X7sbpM4x)E^/9',
      database: 'mysmartfamily',
      entities: [Test],
      synchronize: true,
    }),
    TestModule,
  ],
})
export class DatasModule {}
