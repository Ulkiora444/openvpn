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
            return this.replenishRepository.save(replenish);
        }
        catch{
            throw new HttpException(`Cannot POST /replenish`, HttpStatus.NOT_FOUND);
        }
    }
}