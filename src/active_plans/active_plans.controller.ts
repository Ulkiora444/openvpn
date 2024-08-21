import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { Active_PlansModel } from 'src/Models/active_plans.model';
import { Active_PlansService } from './active_plans.service';
import { AuthenticationAdminGuard } from 'src/Guards/authentication-admin.guard';

@Controller('active_plans')
export class Active_PlansController {
    constructor(private readonly active_plansService: Active_PlansService) {}

    @UseGuards(AuthenticationAdminGuard)
    @Get()
    async find(){
        return this.active_plansService.find();
    }

    @UseGuards(AuthenticationAdminGuard)
    @Get(':id')
    async findOne(@Param('id') id: number){
        return this.active_plansService.findOne(id);
    }

    @Post()
    async create(@Body() active_plans: Active_PlansModel){
        return this.active_plansService.create(active_plans);
    }

    @UseGuards(AuthenticationAdminGuard)
    @Put()
    async update(@Body() active_plans: Active_PlansModel){
        return this.active_plansService.update(active_plans);
    }
    
    @UseGuards(AuthenticationAdminGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.active_plansService.delete(id);
    }
}