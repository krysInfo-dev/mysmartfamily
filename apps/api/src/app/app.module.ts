import { Module } from '@nestjs/common';
import { DatasModule } from '@mysmartfamily/backend-datas';
import { DocumentsModule } from '@mysmartfamily/backend-documents';
import { EmailsModule } from '@mysmartfamily/backend-emails';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    DatasModule,
    DocumentsModule,
    EmailsModule,
  ],
})
export class AppModule {}
