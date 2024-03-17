import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { HashServiceService } from 'src/hash-service/hash-service.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: DatabaseService,
        private readonly hashService: HashServiceService
    ) { }
}
