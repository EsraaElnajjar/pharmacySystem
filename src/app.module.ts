import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { StoreController } from './store/store.controller';
import { StoreService } from './store/store.service';
import { Store } from './entities/store.entity';
import { SelectedItem } from './entities/selected-item.entity';
import { SelectedItemController } from './SelectedItems/selected-item.controller';
import { SelectedItemService } from './SelectedItems/selected-item.service';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'auth',
      entities: [User,Store,SelectedItem], 
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Store]),
    TypeOrmModule.forFeature([SelectedItem]),
    JwtModule.register({
      secret: 'secret66', 
      signOptions: { expiresIn: '1h' }, 
    }),
  ],
  controllers: [AppController,AuthController,StoreController,SelectedItemController],
  providers: [AppService,AuthService,StoreService,SelectedItemService],
})
export class AppModule {}
