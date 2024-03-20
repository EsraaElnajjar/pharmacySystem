// selected-item.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SelectedItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemName: string;

  @Column()
  quantity: number;

  @Column()
  price: number;
}
