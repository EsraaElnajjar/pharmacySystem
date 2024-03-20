// store.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/entities/store.entity';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { AppService } from 'src/app.service';
import { AppController } from 'src/app.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [StoreService,AppService],
  controllers: [StoreController,AppController],
})
export class StoreModule {}
