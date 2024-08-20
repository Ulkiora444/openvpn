import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Active_Plans } from 'src/Entities/active_plans.entity';
import { Plans } from 'src/Entities/plans.entity';
import { Users } from 'src/Entities/users.entity';
import { Active_PlansModel } from 'src/Models/active_plans.model';
import { Repository } from 'typeorm';

@Injectable()
export class Active_PlansService {
    
    constructor(
        @InjectRepository(Active_Plans)
        private readonly active_plansRepository: Repository<Active_Plans>,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(Plans)
        private readonly plansRepository: Repository<Plans>,
    ){}

    async find(){
        try{
            return this.active_plansRepository.find();
        }
        catch{
            throw new HttpException(`Cannot GET /active_plans`, HttpStatus.NOT_FOUND);
        }
    }

    async findOne(id: number){
        try{
            return this.active_plansRepository.findOne({where: {id: id}});
        }
        catch{
            throw new HttpException(`Cannot GET /active_plans/${id}`, HttpStatus.NOT_FOUND);
        }
    }

    async create(active_plans: Active_PlansModel){
        try{
            const user = await this.usersRepository.findOne({where: {id: active_plans.usersId}});
            const plan = await this.plansRepository.findOne({where: {id: active_plans.plansId}});
            if(user.money-plan.price>=0){
                active_plans.startDate = new Date();
                active_plans.endDate = new Date(active_plans.startDate.getFullYear()+(plan.dateName=='y'?plan.time:0), active_plans.startDate.getMonth()+(plan.dateName=='m'?plan.time:0), active_plans.endDate.getDate()+(plan.dateName=='d'?plan.time:0));
                return this.active_plansRepository.save(active_plans);
            }
            throw new HttpException(`Cannot POST /active_plans`, HttpStatus.NOT_FOUND);
        }
        catch{
            throw new HttpException(`Cannot POST /active_plans`, HttpStatus.NOT_FOUND);
        }
    }

    async update(active_plans: Active_PlansModel){
        try{
            // const old_active_plans = await this.active_plansRepository.findOne({where: {name: active_plans.name}});
            // if(!old_active_plans){
            //     return this.active_plansRepository.update(active_plans.id, active_plans);
            // }
            throw new HttpException(`Cannot PUT /active_plans`, HttpStatus.NOT_FOUND);
        }
        catch{
            throw new HttpException(`Cannot PUT /active_plans`, HttpStatus.NOT_FOUND);
        }
    }

    async delete(id: number){
        try{
            return this.active_plansRepository.delete(id);
        }
        catch{
            throw new HttpException(`Cannot DELETE /active_plans/${id}`, HttpStatus.NOT_FOUND);
        }
    }
}