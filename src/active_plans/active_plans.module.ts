import { Module } from '@nestjs/common';
import { Active_PlansService } from './active_plans.service';
import { Active_PlansController } from './active_plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Active_Plans } from 'src/Entities/active_plans.entity';
import { JwtModule } from '@nestjs/jwt';
import { Users } from 'src/Entities/users.entity';
import { Plans } from 'src/Entities/plans.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Active_Plans, Users, Plans]),
        JwtModule.register({
            secret: "isajfysadofbivuvhyw98474y9273459437by978wyebufiadbyfoy2887204357029384bwioeurynwiecufywoineuyaniulyr2304870510451094ncryfhnc0n139rdxn2398djcnj2381mjdc9n8ud0xs812djd",
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [Active_PlansController],
    providers: [Active_PlansService]
})
export class Active_PlansModule {}
