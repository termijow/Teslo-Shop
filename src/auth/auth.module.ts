import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';


@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [TypeOrmModule.forFeature([User]),

  ConfigModule,

  PassportModule.register({ defaultStrategy: 'jwt' }),

  JwtModule.registerAsync({
    imports: [ ConfigModule ],
    inject: [ ConfigService ],
    useFactory: ( configService : ConfigService ) => {
      // console.log('JWT_SECRET', configService.get('JWT_SECRET'))
      // console.log('JWT_SECRET', process.env.JWT_SECRET)
      return {
        secret: configService.get('JWT_SECRET'),
        signOptions: {
        expiresIn: '4h'
      }
    }
  }
})

  // JwtModule.register({
  //   secret: process.env.JWT_SECRET,
  //   signOptions: {
  //     expiresIn: '4h'
  //   }
  // })

],
  exports: [TypeOrmModule,JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
