import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ReplenishModel } from 'src/Models/replenish.model';
import { ReplenishService } from './replenish.service';

@Controller('replenish')
export class ReplenishController {
    constructor(private readonly replenishService: ReplenishService) {}

    @Get()
    async find(){
        return this.replenishService.find();
    }

    @Get(':id')
    async findOne(@Param('id') id: number){
        return this.replenishService.findOne(id);
    }

    @Post()
    async create(@Body() replenish: ReplenishModel){
        return this.replenishService.create(replenish);
    }

    @Put()
    async update(@Body() replenish: ReplenishModel){
        return this.replenishService.update(replenish);
    }
    
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.replenishService.delete(id);
    }
}