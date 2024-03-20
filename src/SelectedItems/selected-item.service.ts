// selected-item.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SelectedItem } from 'src/entities/selected-item.entity';
import { Repository } from 'typeorm';


@Injectable()
export class SelectedItemService {
  constructor(
    @InjectRepository(SelectedItem)
    private selectedItemRepository: Repository<SelectedItem>,
  ) {}

  async create(selectedItemData: Partial<SelectedItem>): Promise<SelectedItem> {
    const selectedItem = this.selectedItemRepository.create(selectedItemData);
    return this.selectedItemRepository.save(selectedItem);
  }

  async findAll(): Promise<any> {
    return this.selectedItemRepository.find();
  }
  
}
