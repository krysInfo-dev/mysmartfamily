import { Test } from '../entity/test.entity';
import { IFindTest } from '@mysmartfamily/shared-models';

export class FindTestDto implements IFindTest {
  count!: number;
  tests!: Test[];
}
