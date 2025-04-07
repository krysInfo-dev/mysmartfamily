import { Test } from '@nestjs/testing';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';

describe('DocumentsController', () => {
  let controller: DocumentsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DocumentsService],
      controllers: [DocumentsController],
    }).compile();

    controller = module.get(DocumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
