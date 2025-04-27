
import { Injectable, Logger } from '@nestjs/common';
import { EmailCampaignsApi, TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from '@getbrevo/brevo';
import brevo = require('@getbrevo/brevo');
import 'multer';
import { ConfigService } from '@nestjs/config';
import * as process from 'node:process';

@Injectable()
export class EmailsService {

  private readonly logger = new Logger(EmailsService.name);
  private readonly transactionalApi: TransactionalEmailsApi;
  private readonly campaignApi: EmailCampaignsApi;

  constructor(private configService: ConfigService) {
    this.transactionalApi = new brevo.TransactionalEmailsApi();
    this.campaignApi = new brevo.EmailCampaignsApi();
    console.log("BREVO_API_KEY (this.configService.get<string>('BREVO_API_KEY')) :")
    console.log(this.configService.get<string>('BREVO_API_KEY'));
    console.log("BREVO_API_KEY (process.env['BREVO_API_KEY']) :")
    console.log(process.env['BREVO_API_KEY']);
    this.transactionalApi.setApiKey(TransactionalEmailsApiApiKeys.apiKey, this.configService.get<string>('BREVO_API_KEY') || '');
  }

  // Envoi d'un mail transactionnel
  async sendTransactionalEmail(
    to: string,
    subject: string,
    htmlContent?: string,
    sender?: { name: string; email: string },
    attachments?: Express.Multer.File[],
    templateId?: number,
    params?: Record<string, any>
  ) {
    const emailData: brevo.SendSmtpEmail = {
      to: [{ email: to }],
      subject,
      sender: sender || { name: 'Krys\'Info', email: 'dev-nau@krysinfo.fr' },
    };

    if (templateId) {
      emailData.templateId = templateId;
      emailData.params = params || {};
    } else if (htmlContent) {
      emailData.htmlContent = htmlContent;
    } else {
      throw new Error('Soit htmlContent soit templateId doit être fourni.');
    }

    if (attachments?.length) {
      emailData.attachment = attachments.map((file) => ({
        content: file.buffer.toString('base64'),
        name: file.originalname,
      }));
    }

    try {
      const result = await this.transactionalApi.sendTransacEmail(emailData);
      this.logger.log(`Email envoyé à ${to} via ${templateId ? `template ${templateId}` : 'HTML direct'}`);
      return result;
    } catch (error) {
      this.logger.error(`Erreur envoi email à ${to}`, error);
      throw error;
    }
  }


  // Création + envoi immédiat d’une campagne emailing
  async sendMassEmail(
    campaignName: string,
    subject: string,
    htmlContent: string,
    sender: { name: string; email: string },
    listIds: number[]
  ) {
    try {
      // Étape 1 : Créer la campagne
      const campaign = await this.campaignApi.createEmailCampaign({
        name: campaignName,
        subject,
        htmlContent,
        sender,
        recipients: { listIds },
      });

      const campaignId = campaign.body.id;
      this.logger.log(`Campagne "${campaignName}" créée avec ID ${campaignId}`);

      // Étape 2 : Envoyer la campagne
      await this.campaignApi.sendEmailCampaignNow(campaignId);
      this.logger.log(`Campagne "${campaignName}" envoyée`);

      return { campaignId };
    } catch (error) {
      this.logger.error('Erreur lors de l’envoi de la campagne', error);
      throw error;
    }
  }
}
