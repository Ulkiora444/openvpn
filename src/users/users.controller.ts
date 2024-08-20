import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsersModel } from 'src/Models/users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async find(){
        return this.usersService.find();
    }

    @Get(':id')
    async findOne(@Param('id') id: number){
        return this.usersService.findOne(id);
    }

    @Post()
    async create(@Body() users: UsersModel){
        return this.usersService.create(users);
    }

    @Put()
    async update(@Body() users: UsersModel){
        return this.usersService.update(users);
    }
    
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id);
    }
}