import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';
import { DepositoDto } from './dto/deposito.dto';
import { SacarDto } from './dto/sacar.dto';

@Injectable()
export class TransacaoService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly userService: UserService
    ) { }

    async depositar(data: DepositoDto) {
        const { cpf_cnpj, valor } = data;

        const user = await this.userService.getUserByCPF_CNPJ(cpf_cnpj);
        if (!user) throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);

        const { id } = user;

        await this.prisma.user.update({
            where: {
                id
            }, data: {
                saldo: {
                    increment: valor
                }
            }
        })

        return await this.prisma.deposito.create({
            data: {
                user_id: id,
                valor: Number(valor)
            }
        });
    }

    async sacar(data: SacarDto) {

    }
}
