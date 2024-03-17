import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseService } from 'src/database/database.service';
import { HashServiceService } from 'src/hash-service/hash-service.service';

@Module({
  providers: [
    UserService,
    DatabaseService,
    HashServiceService
  ],
  controllers: [UserController]
})
export class UserModule { }
