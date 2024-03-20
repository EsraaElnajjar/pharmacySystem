// selected-item.controller.ts

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { SelectedItemService } from './selected-item.service';
import { SelectedItem } from 'src/entities/selected-item.entity';


@Controller('selected-items')
export class SelectedItemController {
  constructor(private selectedItemService: SelectedItemService) {}

  @Post('add')
  async create(@Body() selectedItemData: Partial<SelectedItem>): Promise<SelectedItem> {
    return this.selectedItemService.create(selectedItemData);
  }

  @Get('list')
  async findAll(): Promise<SelectedItem[]> {
    return this.selectedItemService.findAll();
  }
}
