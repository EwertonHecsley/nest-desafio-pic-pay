import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    async login(@Body() Datalogin: LoginDto, @Res() res: Response) {
        const { email, senha } = Datalogin;

        const user = await this.authService.validateUser(email, senha);
        const { senha: _, saldo: __, ...usuario } = user;

        const { token } = await this.authService.login(user);

        return res.status(200).json({ mensagem: 'Usuário logado com sucesso.', usuario, token });

    }
}
