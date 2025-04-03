import { Test } from '@nestjs/testing';
import { DatasController } from './datas.controller';
import { DatasService } from './datas.service';

describe('DatasController', () => {
  let controller: DatasController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DatasService],
      controllers: [DatasController],
    }).compile();

    controller = module.get(DatasController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
