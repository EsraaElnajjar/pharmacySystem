

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  number: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ name: 'purchase price' })
  purchasePrice: number;

  @Column({ name: 'final price' })
  finalPrice: number;

  @Column()
  quantity: number;
}
