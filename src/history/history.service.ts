import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from 'src/Entities/history.entity';
import { HistoryModel } from 'src/Models/history.model';
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

    async create(history: HistoryModel){
        try{
            return this.historyRepository.save(history);
        }
        catch{
            throw new HttpException(`Cannot POST /history`, HttpStatus.NOT_FOUND);
        }
    }

    async update(history: HistoryModel){
        try{
            return this.historyRepository.update(history.id, history);
        }
        catch{
            throw new HttpException(`Cannot PUT /history`, HttpStatus.NOT_FOUND);
        }
    }

    async delete(id: number){
        try{
            return this.historyRepository.delete(id);
        }
        catch{
            throw new HttpException(`Cannot DELETE /history/${id}`, HttpStatus.NOT_FOUND);
        }
    }
}