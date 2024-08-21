import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { HistoryService } from './history.service';
import { AuthenticationAdminGuard } from 'src/Guards/authentication-admin.guard';

@Controller('history')
export class HistoryController {
    constructor(private readonly historyService: HistoryService) {}

    @UseGuards(AuthenticationAdminGuard)
    @Get()
    async find(){
        return this.historyService.find();
    }

    @UseGuards(AuthenticationAdminGuard)
    @Get(':id')
    async findOne(@Param('id') id: number){
        return this.historyService.findOne(id);
    }
}