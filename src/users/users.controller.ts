import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersModel } from 'src/Models/users.model';
import { UsersService } from './users.service';
import { AuthenticationAdminGuard } from 'src/Guards/authentication-admin.guard';

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

    @UseGuards(AuthenticationAdminGuard)
    @Post()
    async create(@Body() users: UsersModel){
        return this.usersService.create(users);
    }

    @Put()
    async update(@Body() users: UsersModel){
        return this.usersService.update(users);
    }
    
    @UseGuards(AuthenticationAdminGuard)
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id);
    }
}