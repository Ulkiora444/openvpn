import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ChecksModel } from 'src/Models/checks.model';
import { ChecksService } from './checks.service';

@Controller('checks')
export class ChecksController {
    constructor(private readonly checksService: ChecksService) {}

    @Get()
    async find(){
        return this.checksService.find();
    }

    @Get(':id')
    async findOne(@Param('id') id: number){
        return this.checksService.findOne(id);
    }

    @Post()
    async create(@Body() checks: ChecksModel){
        return this.checksService.create(checks);
    }

    @Put()
    async update(@Body() checks: ChecksModel){
        return this.checksService.update(checks);
    }
    
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.checksService.delete(id);
    }
}