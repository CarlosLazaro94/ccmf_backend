import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from 'src/repository/AuthRepository/auth.repository';
import { AuthorizationService } from 'src/services/Auth/auth.services';
import { JwtStrategy } from 'src/services/Auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/services/Auth/strategies/local.strategy';
import { jwtConstants } from '../Constants/constants';
import { AuthEntity } from './auth.entity';
 
@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    })
  ],
  providers: [AuthorizationService, AuthRepository, LocalStrategy, JwtStrategy],
  exports: [AuthorizationService],
})
export class AuthModule {}
