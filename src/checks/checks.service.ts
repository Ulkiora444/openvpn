import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Checks } from 'src/Entities/checks.entity';
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
}