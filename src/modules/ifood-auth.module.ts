import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IfoodAuthController } from 'src/controllers/ifood-auth.controller';
import { IfoodToken } from 'src/entities/ifood-auth.entity';
import { IfoodTokenRenewalJob } from 'src/jobs/ifood-token-refresh.job';
import { IfoodAuthMiddleware } from 'src/middleware/ifood-auth.middleware';
import { IfoodAuthService } from 'src/services/ifood-auth.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([IfoodToken]),
  ],
  providers: [IfoodAuthService, IfoodTokenRenewalJob],
  exports: [IfoodAuthService],
})
export class IfoodAuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IfoodAuthMiddleware).forRoutes(IfoodAuthController);
  }
}