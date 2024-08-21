import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ReplenishService } from './replenish.service';
import { ReplenishModel } from 'src/Models/replenish.model';
import { AuthenticationAdminGuard } from 'src/Guards/authentication-admin.guard';

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

    @UseGuards(AuthenticationAdminGuard)
    @Post()
    async create(@Body() replenish: ReplenishModel){
        return this.replenishService.create(replenish);
    }
}