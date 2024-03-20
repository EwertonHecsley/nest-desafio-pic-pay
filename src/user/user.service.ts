import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { HashServiceService } from 'src/hash-service/hash-service.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly hashService: HashServiceService
    ) { }

    async listAllUsers(): Promise<CreateUserDto[]> {
        return await this.prisma.user.findMany();
    }

    async getUserById(id: number): Promise<CreateUserDto> {
        return await this.prisma.user.findUnique({
            where: {
                id
            }
        });
    }

    async getUserByEmail(email: string): Promise<CreateUserDto> {
        return await this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }

    async getUserByCPF_CNPJ(cpf_cnpj: string): Promise<CreateUserDto> {
        return await this.prisma.user.findUnique({
            where: {
                cpf_cnpj: cpf_cnpj
            }
        });
    }

    async validateCPF_CNPJ(cpf_cnpj: string | number): Promise<boolean> {
        const documentoString = String(cpf_cnpj).replace(/\D/g, '');

        return (documentoString.length === 11) ?
            /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/.test(documentoString) :
            (documentoString.length === 14) ?
                /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/.test(documentoString) :
                false;
    }

    async formatCPF_CNPJ(cpf_cnpj: string): Promise<string> {
        return cpf_cnpj.replace(/[^\d]/g, '');
    }

    async createUser(dataUser: CreateUserDto): Promise<CreateUserDto> {
        const { nomeCompleto, cpf_cnpj, email, logista, senha } = dataUser;
        return await this.prisma.user.create({
            data: {
                nomeCompleto: nomeCompleto,
                cpf_cnpj: await this.formatCPF_CNPJ(cpf_cnpj),
                email: email,
                senha: await this.hashService.hashPassword(senha),
                logista: logista
            }
        });
    }
}
