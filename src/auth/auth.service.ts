import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 🔹 Método para registrar um novo usuário
  async register(name: string, email: string, password: string) {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new UnauthorizedException('E-mail já cadastrado!');
    }

    const password_hash = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ name, email, password_hash });
    return await this.userRepository.save(newUser);
  }

  // 🔹 Método para validar credenciais no login
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password_hash)) {
      return user;
    }
    return null;
  }

  // 🔹 Método para gerar um token JWT
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas!');
    }

    const payload = { email: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
