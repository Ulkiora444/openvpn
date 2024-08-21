import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { PlansModel } from 'src/Models/plans.model';
import { PlansService } from './plans.service';
import { AuthenticationAdminGuard } from 'src/Guards/authentication-admin.guard';

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

    @UseGuards(AuthenticationAdminGuard)
    @Post()
    async create(@Body() plans: PlansModel){
        return this.plansService.create(plans);
    }

    @UseGuards(AuthenticationAdminGuard)
    @Put()
    async update(@Body() plans: PlansModel){
        return this.plansService.update(plans);
    }
    
    @UseGuards(AuthenticationAdminGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.plansService.delete(id);
    }
}