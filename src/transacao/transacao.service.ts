import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';
import { DepositoDto } from './dto/deposito.dto';
import { SacarDto } from './dto/sacar.dto';
import { TransferenciaDto } from './dto/transferir.dto';

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
        const { cpf_cnpj, valor } = data;

        const user = await this.userService.getUserByCPF_CNPJ(cpf_cnpj);
        if (!user) throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);

        if (valor > user.saldo) throw new HttpException('Saldo insuficiente para saque.', HttpStatus.BAD_REQUEST);

        const { id } = user;

        await this.prisma.user.update({
            where: {
                id
            }, data: {
                saldo: {
                    decrement: valor
                }
            }
        })

        return await this.prisma.saque.create({
            data: {
                user_id: id,
                valor: Number(valor)
            }
        })
    }

    async transferir(data: TransferenciaDto) {
        const { origemCPF_CNPJ, destinoCPF_CNPJ, valor } = data;

        const userOrigem = await this.userService.getUserByCPF_CNPJ(origemCPF_CNPJ);
        if (!userOrigem) throw new HttpException('Usuário origem não encontrado.', HttpStatus.NOT_FOUND);

        if (userOrigem.logista) throw new HttpException('Tipo de conta logista não é permitida fazer transfêrencia.', HttpStatus.UNAUTHORIZED);

        if (valor > userOrigem.saldo) throw new HttpException('Saldo insuficiente para transferência.', HttpStatus.BAD_REQUEST);

        const userDestino = await this.userService.getUserByCPF_CNPJ(destinoCPF_CNPJ);
        if (!userDestino) throw new HttpException('Usuário destino não encontrado.', HttpStatus.NOT_FOUND);

        await this.prisma.user.update({
            where: {
                id: userOrigem.id
            },
            data: {
                saldo: {
                    decrement: valor
                }
            }
        })

        await this.prisma.user.update({
            where: {
                id: userDestino.id
            },
            data: {
                saldo: {
                    increment: valor
                }
            }
        })

        return await this.prisma.transferencia.create({
            data: {
                user_id_destino: userDestino.id,
                user_id_origem: userOrigem.id,
                valor: Number(valor)
            }
        })
    }

    async getSaldo(id: number) {
        const user = await this.userService.getUserById(id);
        if (!user) throw new HttpException('Usuário não encontrado.', HttpStatus.NOT_FOUND);

        return user.saldo;
    }

    async getExtrato(id: number) {
        const arrTransferencias = await this.prisma.transferencia.findMany();
        const registroDeposito = (await this.prisma.deposito.findMany()).filter((user) => user.user_id == id);
        const registroSaque = (await this.prisma.saque.findMany()).filter((user)=> user.user_id == id);
        const enviadas = arrTransferencias.filter((userEnv) => userEnv.user_id_origem == id);
        const recebidas = arrTransferencias.filter((userRec)=> userRec.user_id_destino == id);

        const registro = {
            depositos: registroDeposito,
            saques: registroSaque,
            transferenciasEnviadas: enviadas,
            transferenciasRecebidas: recebidas
        }

        return registro;
    }
}
