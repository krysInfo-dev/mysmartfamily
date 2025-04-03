import { Test } from '@nestjs/testing';
import { DatasService } from './datas.service';

describe('DatasService', () => {
  let service: DatasService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DatasService],
    }).compile();

    service = module.get(DatasService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
