import { Body, Controller, Get, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async create(@Body() user: CreateUserDto, @Res() res: Response) {

        const verifyEmail = await this.userService.getUserByEmail(user.email);
        if (verifyEmail) throw new HttpException('Email já cadastrado.', HttpStatus.BAD_REQUEST);

        const validateCPF_CNPJ = await this.userService.validateCPF_CNPJ(user.cpf_cnpj);
        if (!validateCPF_CNPJ) throw new HttpException('CPF/CNPJ inválido.', HttpStatus.BAD_REQUEST);

        const vrifyCPF_CNPJ = await this.userService.getUserByCPF_CNPJ(user.cpf_cnpj);
        if (vrifyCPF_CNPJ) throw new HttpException('CPF/CNPJ já cadastrado.', HttpStatus.BAD_REQUEST);

        const { senha: _, ...result } = await this.userService.createUser(user);

        return res.status(HttpStatus.CREATED).json(result);
    }

    @Get()
    async listAllUsers(@Res() res: Response) {
        const users = await this.userService.listAllUsers();

        return res.json(users);
    }
}
