import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Active_Plans } from './active_plans.entity';
import { Roles } from './roles.entity';
import { Replenish } from './replenish.entity';
import { History } from './history.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    phone: string;

    @Column('text')
    email: string;

    @Column('text')
    password: string;

    @Column('text')
    username: string;

    @Column('text')
    name: string;

    @Column('double precision')
    money: number;

    @Column('boolean')
    isDelete: boolean;

    @Column('integer')
    rolesId: number;

    @ManyToOne(type => Roles, (rls) => rls.users)
    roles: Roles;

    @OneToMany(type => History, (rls) => rls.plans)
    history: History[];

    @OneToMany(type => Active_Plans, (rls) => rls.users)
    active_plan: Active_Plans[];

    @OneToMany(type => Replenish, (rls) => rls.users)
    replenish: Replenish[];
}                        
