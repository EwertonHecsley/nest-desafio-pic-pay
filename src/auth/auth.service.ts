import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashServiceService } from 'src/hash-service/hash-service.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly hashService: HashServiceService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async validateUser(email: string, pass: string) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) throw new UnauthorizedException('E-mail não encontrado.');

        const verifyPassword = await this.hashService.compareHash(pass, user.senha);
        if (!verifyPassword) throw new UnauthorizedException('Senha inválida.');

        return user;
    }

    async login(user: CreateUserDto) {
        const payload = { id: user.id, email: user.email, cpf_cnpj: user.cpf_cnpj };
        const secret = this.configService.get('JWT_KEY');
        return {
            token: await this.jwtService.signAsync(payload, { secret })
        }
    }
}




