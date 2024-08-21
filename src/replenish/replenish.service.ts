import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Replenish } from 'src/Entities/replenish.entity';
import { ReplenishModel } from 'src/Models/replenish.model';
import { Repository } from 'typeorm';

@Injectable()
export class ReplenishService {
    
    constructor(
        @InjectRepository(Replenish)
        private readonly replenishRepository: Repository<Replenish>
    ){}

    async find(){
        try{
            return this.replenishRepository.find();
        }
        catch{
            throw new HttpException(`Cannot GET /replenish`, HttpStatus.NOT_FOUND);
        }
    }

    async findOne(id: number){
        try{
            return this.replenishRepository.findOne({where: {id: id}});
        }
        catch{
            throw new HttpException(`Cannot GET /replenish/${id}`, HttpStatus.NOT_FOUND);
        }
    }

    async create(replenish: ReplenishModel){
        try{
            const old_replenish = await this.replenishRepository.findOne({where: {name: replenish.name}});
            if(!old_replenish){
                return this.replenishRepository.save(replenish);
            }
            throw new HttpException(`Cannot POST /replenish`, HttpStatus.NOT_FOUND);
        }
        catch{
            throw new HttpException(`Cannot POST /replenish`, HttpStatus.NOT_FOUND);
        }
    }

    async update(replenish: ReplenishModel){
        try{
            const old_replenish = await this.replenishRepository.findOne({where: {name: replenish.name}});
            if(!old_replenish){
                return this.replenishRepository.update(replenish.id, replenish);
            }
            throw new HttpException(`Cannot PUT /replenish`, HttpStatus.NOT_FOUND);
        }
        catch{
            throw new HttpException(`Cannot PUT /replenish`, HttpStatus.NOT_FOUND);
        }
    }

    async delete(id: number){
        try{
            return this.replenishRepository.delete(id);
        }
        catch{
            throw new HttpException(`Cannot DELETE /replenish/${id}`, HttpStatus.NOT_FOUND);
        }
    }
}