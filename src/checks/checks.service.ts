import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Checks } from 'src/Entities/checks.entity';
import { ChecksModel } from 'src/Models/checks.model';
import { Repository } from 'typeorm';

@Injectable()
export class ChecksService {
    
    constructor(
        @InjectRepository(Checks)
        private readonly checksRepository: Repository<Checks>
    ){}

    async find(){
        try{
            return this.checksRepository.find();
        }
        catch{
            throw new HttpException(`Cannot GET /checks`, HttpStatus.NOT_FOUND);
        }
    }

    async findOne(id: number){
        try{
            return this.checksRepository.findOne({where: {id: id}});
        }
        catch{
            throw new HttpException(`Cannot GET /checks/${id}`, HttpStatus.NOT_FOUND);
        }
    }

    async create(checks: ChecksModel){
        try{
            const old_checks = await this.checksRepository.findOne({where: {name: checks.name}});
            if(!old_checks){
                return this.checksRepository.save(checks);
            }
            throw new HttpException(`Cannot POST /checks`, HttpStatus.NOT_FOUND);
        }
        catch{
            throw new HttpException(`Cannot POST /checks`, HttpStatus.NOT_FOUND);
        }
    }

    async update(checks: ChecksModel){
        try{
            const old_checks = await this.checksRepository.findOne({where: {name: checks.name}});
            if(!old_checks){
                return this.checksRepository.update(checks.id, checks);
            }
            throw new HttpException(`Cannot PUT /checks`, HttpStatus.NOT_FOUND);
        }
        catch{
            throw new HttpException(`Cannot PUT /checks`, HttpStatus.NOT_FOUND);
        }
    }

    async delete(id: number){
        try{
            return this.checksRepository.delete(id);
        }
        catch{
            throw new HttpException(`Cannot DELETE /checks/${id}`, HttpStatus.NOT_FOUND);
        }
    }
}