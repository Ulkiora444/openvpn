import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Login, Registration } from './authentication.model';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/Entities/users.entity';

@Injectable()
export class AuthenticationService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        private jwtService: JwtService,
    ){}

    async login(login: Login){
        try{
            const user_email = await this.usersRepository.findOne({where: {email: login.email}});
            const user_username = await this.usersRepository.findOne({where: {username: login.email}});
            const user = user_email?user_email:(user_username?user_username:false);
            if(user && await compare(login.password, user.password)){
                const token = await this.jwtService.signAsync({id: user.id});
                return {success: true, token: token};        
            }
            return {success: false};
        }catch{
            throw new HttpException("Cannot POST /authentication/login", HttpStatus.NOT_FOUND);
        }
    }

    async registration(registration: Registration){
        try{
            const user_email = await this.usersRepository.findOne({where: {email: registration.email}});
            const user_username = await this.usersRepository.findOne({where: {username: registration.username}});
            const user_phone = await this.usersRepository.findOne({where: {phone: registration.phone}});
            if(!user_email && !user_username && !user_phone){
                registration.password = await hash(registration.password, 10);
                registration.date = new Date();
                const new_user = await this.usersRepository.save(registration);
                const now_user = await this.usersRepository.findOne({where: {email: new_user.email}});
                const token = await this.jwtService.signAsync({id: now_user.id});
                return {success: true, token: token};        
            }
            return {success: false};
        }catch{
            throw new HttpException("Cannot POST /authentication/registration", HttpStatus.NOT_FOUND);
        }
    }

    async checkDatas(datas: any){
        try{
            const data_email = await this.usersRepository.findOne({where: {email: datas.email}});
            const data_username = await this.usersRepository.findOne({where: {username: datas.username}});
            const data_phone = await this.usersRepository.findOne({where: {phone: datas.phone}});
            if(!data_email && !data_username && !data_phone){
                return {success: true};        
            }
            return {success: false, email: data_email?false:true, username: data_username?false:true, phone: data_phone?false:true};
        }catch{
            throw new HttpException("Cannot POST /authentication/check_datas", HttpStatus.NOT_FOUND);
        }
    }

    // async verificationAdmin(token: string){
    //     try{
    //         const tok = this.jwtService.verify(token);
    //         if(tok.role == 'admin'){
    //             return {success: true, role: tok.role};    
    //         }
    //         return {success: false};
    //     }
    //     catch(e){
    //         return {success: false};
    //     }
    // }

    // async verificationUser(token: string){
    //     try{
    //         const tok = this.jwtService.verify(token);
    //         if(tok.role == 'user'){
    //             return {success: true, role: tok.role};    
    //         }
    //         return {success: false};
    //     }
    //     catch(e){
    //         return {success: false};
    //     }
    // }
}
