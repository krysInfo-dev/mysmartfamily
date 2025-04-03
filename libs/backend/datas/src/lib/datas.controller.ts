import { Controller } from '@nestjs/common';
import { DatasService } from './datas.service';

@Controller('datas')
export class DatasController {
  constructor(private datasService: DatasService) {}
}
