import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Active_PlansModel } from 'src/Models/active_plans.model';
import { Active_PlansService } from './active_plans.service';

@Controller('active_plans')
export class Active_PlansController {
    constructor(private readonly active_plansService: Active_PlansService) {}

    @Get()
    async find(){
        return this.active_plansService.find();
    }

    @Get(':id')
    async findOne(@Param('id') id: number){
        return this.active_plansService.findOne(id);
    }

    @Post()
    async create(@Body() active_plans: Active_PlansModel){
        return this.active_plansService.create(active_plans);
    }

    @Put()
    async update(@Body() active_plans: Active_PlansModel){
        return this.active_plansService.update(active_plans);
    }
    
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.active_plansService.delete(id);
    }
}