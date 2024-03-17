import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { HashServiceService } from './hash-service/hash-service.service';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [],
  providers: [HashServiceService],
})
export class AppModule { }
