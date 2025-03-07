import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users.module';
import { IfoodController } from './controllers/ifood.controller';
import { AuthModule } from './modules/auth.module';
import { IfoodApiService } from './services/ifood-api.service';
import { ScheduleModule } from '@nestjs/schedule';
import { OrderController } from './controllers/orders.controller';
import { IfoodAuthController } from './controllers/ifood-auth.controller';
import { IfoodTokenRenewalJob } from './jobs/ifood-token-refresh.job';
import { IfoodAuthModule } from './modules/ifood-auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    IfoodAuthModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, IfoodController, OrderController, IfoodAuthController],
  providers: [AppService, IfoodApiService, IfoodTokenRenewalJob],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    console.log('🚀 Banco de Dados:', this.configService.get<string>('DB_HOST'));
  }
}
