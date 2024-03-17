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

    async createUser(dataUser: CreateUserDto): Promise<CreateUserDto> {
        const { nomeCompleto, cpf_cnpj, email, logista, senha } = dataUser;
        return await this.prisma.user.create({
            data: {
                nomeCompleto: nomeCompleto,
                cpf_cnpj: cpf_cnpj,
                email: email,
                senha: await this.hashService.hashPassword(senha),
                logista: logista
            }
        });
    }
}
