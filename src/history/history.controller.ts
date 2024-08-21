import { Controller, Get, Param } from '@nestjs/common';
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