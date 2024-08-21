import { Controller, Get, Param } from '@nestjs/common';
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
}