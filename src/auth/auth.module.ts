import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([User]), 
      ],
  controllers: [AuthController,AppController],
  providers: [AuthService,AppService],
})
export class AuthModule {}
