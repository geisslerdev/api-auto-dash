import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from 'src/entities/subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  providers: [],
  exports: [],
})
export class SubscriptionModule {}