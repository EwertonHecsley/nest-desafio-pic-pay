import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { DepositoDto } from './dto/deposito.dto';
import { Request, Response } from 'express';
import { SacarDto } from './dto/sacar.dto';
import { TransferenciaDto } from './dto/transferir.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('transacao')
export class TransacaoController {
    constructor(private readonly transacaoService: TransacaoService) { }

    @Post('/deposito')
    async depositar(@Body() data: DepositoDto, @Res() res: Response) {
        const { valor } = data;

        if (valor <= 0) throw new HttpException('Valor insuficiente para depósito.', HttpStatus.BAD_REQUEST);

        const transacao = await this.transacaoService.depositar(data);

        return res.status(HttpStatus.CREATED).json({ mensagem: 'Depósito realizado com sucesso.', transacao });
    }

    @Post('/saque')
    async sacar(@Body() data: SacarDto, @Res() res: Response) {
        const { valor } = data;

        if (valor <= 0) throw new HttpException('Valor para saque inválido.', HttpStatus.BAD_REQUEST);

        const transacao = await this.transacaoService.sacar(data);

        return res.status(HttpStatus.CREATED).json({ mensagem: 'Saque realizado com sucesso.', transacao });
    }

    @Post('/transferencia')
    async transferencia(@Body() data: TransferenciaDto, @Res() res: Response) {
        const { valor } = data;

        if (valor <= 0) throw new HttpException('Valor para transferência inválido.', HttpStatus.BAD_REQUEST);

        const transacao = await this.transacaoService.transferir(data);

        return res.status(HttpStatus.CREATED).json({ mensagem: 'Transferência realizada com sucesso.', transacao });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/saldo')
    async saldo(@Req() req: Request, @Res() res: Response) {
        const { id } = req.user as CreateUserDto;

        const result = await this.transacaoService.getSaldo(Number(id));

        const saldo = result.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        return res.json({ saldo });
    }

    @UseGuards(JwtAuthGuard)
    @Get('/extrato')
    async extrato(@Req() req: Request, @Res() res: Response) {
        const { id } = req.user as CreateUserDto;

        const result = await this.transacaoService.getExtrato(id);

        return res.json(result);
    }
}
