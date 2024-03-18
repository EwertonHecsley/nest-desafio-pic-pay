import { Module } from '@nestjs/common';
import { TransacaoService } from './transacao.service';
import { TransacaoController } from './transacao.controller';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';
import { HashServiceService } from 'src/hash-service/hash-service.service';

@Module({
  providers: [TransacaoService, DatabaseService, UserService, HashServiceService],
  controllers: [TransacaoController]
})
export class TransacaoModule { }
