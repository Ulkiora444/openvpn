import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Users } from 'src/Entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: "asdhflaskjhrfaiseuro7qwi3yr2378ryboqw73gyroda873yfak37yrfauyr7ay3d8yod482q34h89dq2394h9q82o7dh3847fli3847h8fiw457uwt458qyhod38y4ojq9823dbot8w3h4djj85dho48w75ofiwh4j4d875slfih45lise4fh837o4985f7q89d520850dllafzqzowirjcnewuirtw",
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService] 
})
export class AuthenticationModule {}
