import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import 'multer';

@Controller('documents')
export class DocumentsController {

  constructor(private documentsService: DocumentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('Aucun fichier reçu', HttpStatus.BAD_REQUEST);
    }

    return this.documentsService.uploadToDufs(file);
  }

  @Get('download/:filename')
  async downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const fileStream = await this.documentsService.downloadFromDufs(filename);

      // Transmet le stream tel quel au client
      fileStream.data.pipe(res);

      res.set({
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Type': fileStream.headers['content-type'],
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Erreur lors du téléchargement du fichier',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':filename')
  async loadFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const fileStream = await this.documentsService.downloadFromDufs(filename);

      // Transmet le stream tel quel au client
      fileStream.data.pipe(res);

      res.set({
        'Content-Type': fileStream.headers['content-type'],
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Erreur lors du téléchargement du fichier',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

}
