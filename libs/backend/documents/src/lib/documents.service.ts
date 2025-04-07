import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import 'multer';

@Injectable()
export class DocumentsService {

  private readonly dufsBaseUrl = 'http://localhost:5000/';

  async uploadToDufs(file: Express.Multer.File): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('file', new Blob([file.buffer]), file.originalname);
      const response = await axios.put(this.dufsBaseUrl + file.originalname , formData, {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      return {
        message: 'Fichier transféré avec succès à Dufs',
        dufsResponse: response.data,
      };
    } catch (err) {
      console.error('Erreur lors de l\'upload vers Dufs :', err);
      throw new HttpException('Erreur lors de l\'upload vers Dufs', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async downloadFromDufs(filename: string) {
    try {
      const url = `${this.dufsBaseUrl}${encodeURIComponent(filename)}`;
      return axios.get(url, {
        responseType: 'stream',
      });
    } catch (err) {
      console.error('Erreur lors du download depuis Dufs :', err);
      throw new HttpException('Erreur lors du download depuis Dufs', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
