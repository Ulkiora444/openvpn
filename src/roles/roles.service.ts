import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/Entities/roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
    
    constructor(
        @InjectRepository(Roles)
        private readonly rolesRepository: Repository<Roles>
    ){}

    async find(){
        try{
            return this.rolesRepository.find();
        }
        catch{
            throw new HttpException(`Cannot GET /roles`, HttpStatus.NOT_FOUND);
        }
    }

    async findOne(id: number){
        try{
            return this.rolesRepository.findOne({where: {id: id}});
        }
        catch{
            throw new HttpException(`Cannot GET /roles/${id}`, HttpStatus.NOT_FOUND);
        }
    }
}