import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Active_Plans } from 'src/Entities/active_plans.entity';
import { Plans } from 'src/Entities/plans.entity';
import { Users } from 'src/Entities/users.entity';
import { Active_PlansModel } from 'src/Models/active_plans.model';
import { Repository } from 'typeorm';
import { spawn } from 'child_process';
import { Observable } from 'rxjs';
import * as path from 'path';
import { History } from 'src/Entities/history.entity';

@Injectable()
export class Active_PlansService {
    
    constructor(
        @InjectRepository(Active_Plans)
        private readonly active_plansRepository: Repository<Active_Plans>,
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(Plans)
        private readonly plansRepository: Repository<Plans>,
        @InjectRepository(History)
        private readonly historyRepository: Repository<History>,
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
        // try{
            let user = await this.usersRepository.findOne({where: {id: active_plans.usersId}});
            let plan = await this.plansRepository.findOne({where: {id: active_plans.plansId}});
            if(user.money>=plan.price){
                let all_plans_this_user = await this.active_plansRepository.find({where: {usersId: active_plans.usersId}});
                active_plans.startDate = new Date();
                active_plans.endDate = new Date(active_plans.startDate.getFullYear()+(plan.dateName=='y'?plan.time:0), active_plans.startDate.getMonth()+(plan.dateName=='m'?plan.time:0), active_plans.startDate.getDate()+(plan.dateName=='d'?plan.time:0));
                active_plans.file = user.name+(all_plans_this_user.length==0?'':'_'+all_plans_this_user.length+1)+'.ovpn';


                let filename = path.resolve(__dirname, '..', '..', 'public', 'python_scripts');
                let fullPath = path.join(filename, 'create_key.py');
                let python_script: any = new Observable((observer: any) => {
                    const pythonProcess = spawn('python', [fullPath, user.name+(all_plans_this_user.length==0?'':'_'+all_plans_this_user.length+1)]);
                
                    pythonProcess.stdout.on('data', (data: any) => {
                        this.active_plansRepository.save(active_plans);
                        user.money -= plan.price;
                        this.usersRepository.update(user.id, user);
                        this.historyRepository.save({usersId: user.id, plansId: plan.id})
                        observer.next({success: true});
                    });
                    
                    pythonProcess.stderr.on('data', (data) => {
                        observer.error(new HttpException(`Cannot POST /active_plans`, HttpStatus.NOT_FOUND));
                    });
                
                    pythonProcess.on('close', (code) => {
                        observer.complete(new HttpException(`Cannot POST /active_plans`, HttpStatus.NOT_FOUND));
                    });
                });
                return python_script;
            }            
            throw new HttpException(`Cannot POST /active_plans`, HttpStatus.NOT_FOUND);
        // }
        // catch{
        //     throw new HttpException(`Cannot POST /active_plans`, HttpStatus.NOT_FOUND);
        // }
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