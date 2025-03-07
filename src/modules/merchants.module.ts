import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Merchant } from 'src/entities/merchant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Merchant])],
  providers: [],
  exports: [],
})
export class MerchantModule {}
