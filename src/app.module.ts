import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Merchant } from './entities/merchant.entity';
import { Subscription } from 'rxjs';
import { UsersModule } from './users/users.module';
import { IfoodController } from './controllers/ifood.controller';
import { OrderController } from './controllers/orders.controller';

@Module({
  // imports: [
  //   TypeOrmModule.forRoot({
  //     type: 'postgres',
  //     host: process.env.DB_HOST || 'database-1.cf64eqcyyvd7.us-east-2.rds.amazonaws.com',
  //     port: Number(process.env.DB_PORT) || 5432,
  //     username: process.env.DB_USER || 'dbadmin',
  //     password: process.env.DB_PASS || 'dbPassword1108',
  //     database: process.env.DB_NAME || 'mydatabase',
  //     entities: [User, Merchant, Subscription],
  //     synchronize: true,
  //   }),
  //   AuthModule,
  //   UsersModule,
  // ],
  controllers: [AppController, IfoodController, OrderController],
  providers: [AppService],
})
export class AppModule { }
