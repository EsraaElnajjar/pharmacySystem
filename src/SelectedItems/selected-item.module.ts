// selected-item.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectedItemService } from './selected-item.service';
import { SelectedItemController } from './selected-item.controller';
import { SelectedItem } from 'src/entities/selected-item.entity';
import { AppService } from 'src/app.service';
import { AppController } from 'src/app.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SelectedItem])],
  providers: [SelectedItemService,AppService],
  controllers: [SelectedItemController,AppController],
})
export class SelectedItemModule {}
