
import { Injectable, Logger } from '@nestjs/common';
import { EmailCampaignsApi, TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from '@getbrevo/brevo';
import brevo = require('@getbrevo/brevo');
import 'multer';

@Injectable()
export class EmailsService {

  private readonly logger = new Logger(EmailsService.name);
  private readonly transactionalApi: TransactionalEmailsApi;
  private readonly campaignApi: EmailCampaignsApi;

  constructor() {
    this.transactionalApi = new brevo.TransactionalEmailsApi();
    this.campaignApi = new brevo.EmailCampaignsApi();
    this.transactionalApi.setApiKey(TransactionalEmailsApiApiKeys.apiKey, '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');
  }

  // 📩 Envoi d'un mail transactionnel
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


  // 📢 Création + envoi immédiat d’une campagne emailing
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
