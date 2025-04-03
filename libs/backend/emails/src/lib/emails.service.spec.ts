import { Test } from '@nestjs/testing';
import { EmailsService } from './emails.service';

describe('EmailsService', () => {
  let service: EmailsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EmailsService],
    }).compile();

    service = module.get(EmailsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
