import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { HashServiceService } from './hash-service/hash-service.service';
import { TransacaoModule } from './transacao/transacao.module';
import { AuthModule } from './auth/auth.module';
import { MustacheModule } from './utils/mustache/mustache.module';
import { EmailModule } from './utils/email/email.module';

@Module({
  imports: [DatabaseModule, UserModule, TransacaoModule, AuthModule, MustacheModule, EmailModule],
  controllers: [],
  providers: [HashServiceService],
})
export class AppModule { }
