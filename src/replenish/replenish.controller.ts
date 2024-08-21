import { Controller, Get, Param } from '@nestjs/common';
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