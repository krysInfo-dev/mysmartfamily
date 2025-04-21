import { Module } from '@nestjs/common';
import { DatasModule } from '@mysmartfamily/backend-datas';
import { DocumentsModule } from '@mysmartfamily/backend-documents';
import { EmailsModule } from '@mysmartfamily/backend-emails';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatasModule,
    DocumentsModule,
    EmailsModule,
  ],
})
export class AppModule {}
