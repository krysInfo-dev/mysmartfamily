import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Test {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  content?: string;

}
