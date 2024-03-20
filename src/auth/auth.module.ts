import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { HashServiceService } from 'src/hash-service/hash-service.service';
import { DatabaseService } from 'src/database/database.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: '1h'
      }
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    DatabaseService,
    AuthService,
    UserService,
    HashServiceService,
    JwtService,
    ConfigService
  ]
})
export class AuthModule { }
