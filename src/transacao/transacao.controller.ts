import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { DepositoDto } from './dto/deposito.dto';
import { Response } from 'express';

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
}
