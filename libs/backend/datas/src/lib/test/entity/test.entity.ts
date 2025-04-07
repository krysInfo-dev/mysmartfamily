import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ITest } from '@mysmartfamily/shared-models';

@Entity()
export class Test implements ITest {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  content?: string;

}
