// store.controller.ts

import { Body, Controller, Get, Post } from '@nestjs/common';
import { StoreService } from './store.service';
import { Store } from 'src/entities/store.entity';


@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('list')
  async findAll(): Promise<Store[]> {
    return this.storeService.findAll();
  }
  @Post('add')
  async addElement(@Body() elementData: any): Promise<Store> {
    return this.storeService.addElement(elementData);
  }
}
