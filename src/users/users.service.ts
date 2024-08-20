import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/Entities/users.entity';
import { UsersModel } from 'src/Models/users.model';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>
    ){}

    async find(){
        try{
            return this.usersRepository.find();
        }
        catch{
            throw new HttpException(`Cannot GET /users`, HttpStatus.NOT_FOUND);
        }
    }

    async findOne(id: number){
        try{
            return this.usersRepository.findOne({where: {id: id}});
        }
        catch{
            throw new HttpException(`Cannot GET /users/${id}`, HttpStatus.NOT_FOUND);
        }
    }

    async create(users: UsersModel){
        try{
            const old_users = await this.usersRepository.findOne({where: {name: users.name}});
            if(!old_users){
                return this.usersRepository.save(users);
            }
            throw new HttpException(`Cannot POST /users`, HttpStatus.NOT_FOUND);
        }
        catch{
            throw new HttpException(`Cannot POST /users`, HttpStatus.NOT_FOUND);
        }
    }

    async update(users: UsersModel){
        try{
            const old_users = await this.usersRepository.findOne({where: {name: users.name}});
            if(!old_users){
                return this.usersRepository.update(users.id, users);
            }
            throw new HttpException(`Cannot PUT /users`, HttpStatus.NOT_FOUND);
        }
        catch{
            throw new HttpException(`Cannot PUT /users`, HttpStatus.NOT_FOUND);
        }
    }

    async delete(id: number){
        try{
            return this.usersRepository.delete(id);
        }
        catch{
            throw new HttpException(`Cannot DELETE /users/${id}`, HttpStatus.NOT_FOUND);
        }
    }
}