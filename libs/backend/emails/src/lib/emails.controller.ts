import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  BadRequestException
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { EmailsService } from './emails.service';

@Controller('emails')
export class EmailsController {

  constructor(private emailsService: EmailsService) {}

  // 📩 Envoi d’un mail transactionnel avec pièces jointes
  @Post('transactional')
  @UseInterceptors(FilesInterceptor('attachments'))
  async sendTransactionalEmail(
    @Body() body: any,
    @UploadedFiles() attachments: Express.Multer.File[]
  ) {
    const {
      to,
      subject,
      htmlContent,
      senderName,
      senderEmail,
      templateId,
      params
    } = body;

    if (!to || !subject) {
      throw new BadRequestException('Champs "to" et "subject" requis');
    }

    return this.emailsService.sendTransactionalEmail(
      to,
      subject,
      htmlContent,
      { name: senderName || 'Krys\'Info', email: senderEmail || 'dev-nau@krysinfo.fr' },
      attachments,
      templateId ? Number(templateId) : undefined,
      params ? JSON.parse(params) : undefined
    );
  }

  // 📢 Envoi d’une campagne
  @Post('mass')
  async sendMassEmail(@Body() body: any) {
    const { campaignName, subject, htmlContent, senderName, senderEmail, listIds } = body;

    if (!campaignName || !subject || !htmlContent || !listIds?.length) {
      throw new BadRequestException('Champs requis manquants');
    }

    return this.emailsService.sendMassEmail(
      campaignName,
      subject,
      htmlContent,
      { name: senderName || 'Krys Info', email: senderEmail || 'newsletter@krysinfo.fr' },
      listIds.map(Number)
    );
  }

}
