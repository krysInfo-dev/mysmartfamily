import { Test } from '@nestjs/testing';
import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';
import { ConfigModule } from '@nestjs/config';

describe('EmailsController', () => {
  let controller: EmailsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [await ConfigModule.forRoot({
        isGlobal: true,
      }),],
      providers: [EmailsService],
      controllers: [EmailsController],
    }).compile();

    controller = module.get(EmailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
