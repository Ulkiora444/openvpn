import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';
import { Plans } from './plans.entity';

@Entity()
export class Active_Plans {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('integer')
    usersId: number;

    @Column('integer')
    plansId: number;

    @Column('timestamp with time zone')
    startDate: Date;

    @Column('timestamp with time zone')
    endDate: Date;

    @Column('text')
    file: string;

    @ManyToOne(type => Users, (rls) => rls.active_plan)
    users: Users;

    @ManyToOne(type => Plans, (rls) => rls.active_plan)
    plans: Plans;
}                        
