import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Merchant } from './entities/merchant.entity';
import { Subscription } from 'rxjs';
import { UsersModule } from './users/users.module';
import { IfoodController } from './controllers/ifood.controller';
import { AuthModule } from './modules/auth.module';
import { IfoodData } from './entities/ifood-data.entity';
import { IfoodApiService } from './services/ifood-api.service';
import { IfoodAuthService } from './services/ifood-auth.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';
import { IfoodToken } from './entities/ifood-auth.entity';
import { OrderController } from './controllers/orders.controller';
import { IfoodAuthController } from './controllers/ifood-auth.controller';
import { AuthService } from './services/auth.service';
import { IfoodTokenRenewalJob } from './jobs/ifood-token-refresh.job';
import { IfoodAuthMiddleware } from './middleware/ifood-auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'database-1.cf64eqcyyvd7.us-east-2.rds.amazonaws.com',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'dbadmin',
      password: process.env.DB_PASS || 'dbPassword1108',
      database: process.env.DB_NAME || 'mydatabase',
      entities: [User, Merchant, Subscription, IfoodData, IfoodToken],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    HttpModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController, IfoodController, OrderController, IfoodAuthController],
  providers: [AppService, IfoodApiService, IfoodAuthService, AuthService, IfoodTokenRenewalJob],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IfoodAuthMiddleware).forRoutes(IfoodAuthController);
  }
}
