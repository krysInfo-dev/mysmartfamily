import { Test } from '@nestjs/testing';
import { DocumentsService } from './documents.service';

describe('DocumentsService', () => {
  let service: DocumentsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DocumentsService],
    }).compile();

    service = module.get(DocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
