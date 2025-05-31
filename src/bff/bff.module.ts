import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BffController } from './controllers/bff.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { BffAdapter } from './adapters/bff';
import { BffUseCase } from './use-cases/bff';
import { BffClient } from './clients/bff';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultsecret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [BffController],
  providers: [BffAdapter, BffUseCase, BffClient, JwtStrategy],
})
export class BffModule {}
