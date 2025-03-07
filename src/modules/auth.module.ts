import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../entities/user.entity';
import { AuthService } from 'src/services/auth.service';
import { AuthController } from 'src/controllers/auth.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Importa a entidade User
    JwtModule.register({
      secret: 'supersecreto', // 🔹 Trocar por variável de ambiente em produção
      signOptions: { expiresIn: '1h' },
    }),
    HttpModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
