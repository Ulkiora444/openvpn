import { Module } from '@nestjs/common';
import { ReplenishService } from './replenish.service';
import { ReplenishController } from './replenish.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Replenish } from 'src/Entities/replenish.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([Replenish]),
        JwtModule.register({
            secret: "isajfysadofbivuvhyw98474y9273459437by978wyebufiadbyfoy2887204357029384bwioeurynwiecufywoineuyaniulyr2304870510451094ncryfhnc0n139rdxn2398djcnj2381mjdc9n8ud0xs812djd",
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [ReplenishController],
    providers: [ReplenishService]
})
export class ReplenishModule {}
