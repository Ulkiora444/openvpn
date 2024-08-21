import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { HistoryModel } from 'src/Models/history.model';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    @Get()
    async find(){
        return this.historyService.find();
    }

    @Get(':id')
    async findOne(@Param('id') id: number){
        return this.historyService.findOne(id);
    }
}