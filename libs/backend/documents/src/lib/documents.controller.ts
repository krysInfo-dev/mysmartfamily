import { Controller } from '@nestjs/common';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}
}
