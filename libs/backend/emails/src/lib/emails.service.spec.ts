import { Test } from '@nestjs/testing';
import { EmailsService } from './emails.service';
import { ConfigModule } from '@nestjs/config';

describe('EmailsService', () => {
  let service: EmailsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [await ConfigModule.forRoot({
        isGlobal: true,
      }),],
      providers: [EmailsService],
    }).compile();

    service = module.get(EmailsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
