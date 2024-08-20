import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PlansModel } from 'src/Models/plans.model';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
    constructor(private readonly plansService: PlansService) {}

    @Get()
    async find(){
        return this.plansService.find();
    }

    @Get(':id')
    async findOne(@Param('id') id: number){
        return this.plansService.findOne(id);
    }

    @Post()
    async create(@Body() plans: PlansModel){
        return this.plansService.create(plans);
    }

    @Put()
    async update(@Body() plans: PlansModel){
        return this.plansService.update(plans);
    }
    
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.plansService.delete(id);
    }
}