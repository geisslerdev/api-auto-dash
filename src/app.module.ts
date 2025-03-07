import { Module } from '@nestjs/common';
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
import { OrderController } from './controllers/orders.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'database-1.cf64eqcyyvd7.us-east-2.rds.amazonaws.com',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'dbadmin',
      password: process.env.DB_PASS || 'dbPassword1108',
      database: process.env.DB_NAME || 'mydatabase',
      entities: [User, Merchant, Subscription, IfoodData],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    HttpModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController, IfoodController, OrderController],
  providers: [AppService, IfoodApiService, IfoodAuthService],
})
export class AppModule { }
