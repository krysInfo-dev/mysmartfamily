import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from './entity/test.entity';

@Injectable()
export class TestService {

  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {}

  async create(test: Test): Promise<number> {
    return await this.testRepository.save(test).then((res) => res.id);
  }

 async readAll(): Promise<Test[]> {
    return await this.testRepository.find().then((res) => res.map((test) => ({ ...test } as Test)));
  }

  async read(filter: string, pageNumber: number, pageSize: number) {
    console.log(filter);
    console.log(pageNumber);
    console.log(pageSize);
    const queryBuilder = this.testRepository.createQueryBuilder('test');
    queryBuilder.where('test.content LIKE :filterContent', {
      filterContent: `%${filter.toLowerCase()}%`,
    });
    if (pageNumber && pageSize) {
      queryBuilder.skip(pageNumber * pageSize);
      queryBuilder.take(pageSize);
    }
    queryBuilder.orderBy('test.id', 'ASC');
    console.log(queryBuilder.getQuery());
    const count = await queryBuilder.getCount();
    const tests = await queryBuilder.getMany();
    return { count: count, tests: tests };
  }

  async readOne(id: number): Promise<Test> {
    return await this.testRepository.findOneBy({ id }).then((res) => res as Test);
  }

  async update(test: Test): Promise<void> {
    return await this.testRepository.save(test).then(() => undefined);
  }

  async delete(id: number): Promise<void> {
    return await this.testRepository.delete(id).then(() => undefined);
  }

}
