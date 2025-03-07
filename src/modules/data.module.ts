import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { IfoodData } from 'src/entities/ifood-data.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([IfoodData]),
    HttpModule,
  ],
  providers: [],
  controllers: [],
})
export class DataModule {}