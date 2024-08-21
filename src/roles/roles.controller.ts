import { Controller, Get, Param} from '@nestjs/common';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Get()
    async find(){
        return this.rolesService.find();
    }

    @Get(':id')
    async findOne(@Param('id') id: number){
        return this.rolesService.findOne(id);
    }
}