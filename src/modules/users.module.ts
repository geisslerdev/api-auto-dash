import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
