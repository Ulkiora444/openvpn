import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Login, Registration } from './authentication.model';
import { AuthenticationService } from './authentication.service';
import { AuthenticationAdminGuard } from 'src/Guards/authentication-admin.guard';
import { AuthenticationUserGuard } from 'src/Guards/authentication-user.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  async login(@Body() login: Login){
    return this.authenticationService.login(login);
  }

  @Post('registration')
  async registration(@Body() registration: Registration){
    return this.authenticationService.registration(registration);
  }

  @Post('check_datas')
  async checkDatas(@Body() datas: any){
    return this.authenticationService.checkDatas(datas);
  }

  // @UseGuards(AuthenticationAdminGuard)
  // @Post('verification')
  // async verificationAdmin(@Body() token: any){
  //   return this.authenticationService.verificationAdmin(token.token);
  // }

  // @UseGuards(AuthenticationUserGuard)
  // @Post('verification/user')
  // async verificationUser(@Body() token: any){
  //   return this.authenticationService.verificationUser(token.token);
  // }
}
