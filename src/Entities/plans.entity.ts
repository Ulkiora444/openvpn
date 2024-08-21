import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Active_Plans } from './active_plans.entity';
import { History } from './history.entity';

@Entity()
export class Plans {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @Column('double precision')
    price: number;

    @Column('integer')
    time: number;

    @Column('text')
    dateName: string;

    @OneToMany(type => History, (rls) => rls.plans)
    history: History[];

    @OneToMany(type => Active_Plans, (rls) => rls.plans)
    active_plan: Active_Plans[];
}                        
