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
}
