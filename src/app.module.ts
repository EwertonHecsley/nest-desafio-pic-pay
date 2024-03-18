import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { HashServiceService } from './hash-service/hash-service.service';
import { TransacaoModule } from './transacao/transacao.module';

@Module({
  imports: [DatabaseModule, UserModule, TransacaoModule],
  controllers: [],
  providers: [HashServiceService],
})
export class AppModule { }
