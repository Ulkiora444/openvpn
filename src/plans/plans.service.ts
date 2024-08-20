import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plans } from 'src/Entities/plans.entity';
import { PlansModel } from 'src/Models/plans.model';
import { Repository } from 'typeorm';

@Injectable()
export class PlansService {
    
    constructor(
        @InjectRepository(Plans)
        private readonly plansRepository: Repository<Plans>
    ){}

    async find(){
        try{
            return this.plansRepository.find();
        }
        catch{
            throw new HttpException(`Cannot GET /plans`, HttpStatus.NOT_FOUND);
        }
    }

    async findOne(id: number){
        try{
            return this.plansRepository.findOne({where: {id: id}});
        }
        catch{
            throw new HttpException(`Cannot GET /plans/${id}`, HttpStatus.NOT_FOUND);
        }
    }

    async create(plans: PlansModel){
        try{
            const old_plans = await this.plansRepository.findOne({where: {name: plans.name}});
            if(!old_plans){
                return this.plansRepository.save(plans);
            }
            throw new HttpException(`Cannot POST /plans`, HttpStatus.NOT_FOUND);
        }
        catch{
            throw new HttpException(`Cannot POST /plans`, HttpStatus.NOT_FOUND);
        }
    }

    async update(plans: PlansModel){
        try{
            const old_plans = await this.plansRepository.findOne({where: {name: plans.name}});
            if(!old_plans){
                return this.plansRepository.update(plans.id, plans);
            }
            throw new HttpException(`Cannot PUT /plans`, HttpStatus.NOT_FOUND);
        }
        catch{
            throw new HttpException(`Cannot PUT /plans`, HttpStatus.NOT_FOUND);
        }
    }

    async delete(id: number){
        try{
            return this.plansRepository.delete(id);
        }
        catch{
            throw new HttpException(`Cannot DELETE /plans/${id}`, HttpStatus.NOT_FOUND);
        }
    }
}