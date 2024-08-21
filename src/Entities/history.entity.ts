import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';
import { Plans } from './plans.entity';
import { Checks } from './checks.entity';

@Entity()
export class History {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('integer')
    usersId: number;

    @Column('integer')
    plansId: number;

    @Column('integer')
    checksId: number;

    @ManyToOne(type => Users, (rls) => rls.history)
    users: Users;

    @ManyToOne(type => Plans, (rls) => rls.history)
    plans: Plans;

    @ManyToOne(type => Checks, (rls) => rls.history)
    checks: Checks;
}                        
