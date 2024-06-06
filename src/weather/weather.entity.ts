import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('jsonb')
  data: any;

  @Column()
  lat: number;

  @Column()
  lon: number;

  @Column()
  part: string;
}
