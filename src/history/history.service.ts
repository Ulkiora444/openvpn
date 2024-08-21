import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from 'src/Entities/history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {
    
    constructor(
        @InjectRepository(History)
        private readonly historyRepository: Repository<History>
    ){}

    async find(){
        try{
            return this.historyRepository.find();
        }
        catch{
            throw new HttpException(`Cannot GET /history`, HttpStatus.NOT_FOUND);
        }
    }

    async findOne(id: number){
        try{
            return this.historyRepository.findOne({where: {id: id}});
        }
        catch{
            throw new HttpException(`Cannot GET /history/${id}`, HttpStatus.NOT_FOUND);
        }
    }
}