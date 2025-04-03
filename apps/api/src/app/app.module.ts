import { Module } from '@nestjs/common';
import { DatasModule } from '@mysmartfamily/backend-datas';
import { DocumentsModule } from '@mysmartfamily/backend-documents';
import { EmailsModule } from '@mysmartfamily/backend-emails';

@Module({
  imports: [
    DatasModule,
    DocumentsModule,
    EmailsModule,
  ],
})
export class AppModule {}
