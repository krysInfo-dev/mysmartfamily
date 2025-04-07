import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { TestService } from './test.service';
import { Test } from './entity/test.entity';
import { FindTestDto } from './dto/find-test-dto';

@Controller('datas/test')
export class TestController {

  constructor(private testService: TestService) {}

  @Post()
  @HttpCode(204)
  async create(@Body() test: Test): Promise<number> {
    return this.testService.create(test);
  }

  @Get('/all')
  async readAll(): Promise<Test[]> {
    console.log('readAll');
    return this.testService.readAll();
  }

  @Get()
  async read(@Query('filter') filter: string,
             @Query('pageNumber') pageNumber: number,
             @Query('pageSize') pageSize: number): Promise<FindTestDto> {
    console.log('read');
    console.log(filter);
    console.log(pageNumber);
    console.log(pageSize);
    return this.testService.read(filter, pageNumber, pageSize);
  }

  @Get(':id')
  async readOne(@Param('id') id: number): Promise<Test> {
    return this.testService.readOne(id);
  }

  @Put()
  async update(@Body() test: Test): Promise<void> {
    return this.testService.update(test);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.testService.delete(id);
  }

}
