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
}