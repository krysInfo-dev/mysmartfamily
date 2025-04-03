import { Test } from '../entity/test.entity';

export class FindTestDto {
  count!: number;
  tests!: Test[];
}
