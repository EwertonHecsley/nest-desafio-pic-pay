import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    async login(@Body() Datalogin: LoginDto, @Req() req: Request, @Res() res: Response) {
        const { email, senha } = Datalogin;

        const user = await this.authService.validateUser(email, senha);

        const { token } = await this.authService.login(user);

        const { senha: _, saldo: __, ...usuario } = user;

        req.user = { id: usuario.id, email: usuario.email }

        return res.status(200).json({ mensagem: 'Usuário logado com sucesso.', usuario, token });

    }
}
