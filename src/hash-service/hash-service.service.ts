import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashServiceService {
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 8);
    }

    async compareHash(password: string, passwordHash: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordHash);
    }
}
