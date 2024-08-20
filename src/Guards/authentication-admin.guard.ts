import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationAdminGuard implements CanActivate {
  constructor(private jwtService: JwtService){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try{
      const authentication = context.switchToHttp().getRequest().headers.authentication;
      const tok = this.jwtService.verify(authentication)
      if(tok.role=='admin'){
          return true;
      }
      else{
          return false;
      }
    }catch(e){
        return false;
    }  
  }
}
