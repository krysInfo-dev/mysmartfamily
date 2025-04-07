import { Test } from '@nestjs/testing';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';

describe('EmailsController', () => {
  let controller: EmailsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EmailsService],
      controllers: [EmailsController],
    }).compile();

    controller = module.get(EmailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
