import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { History } from './history.entity';

@Entity()
export class Checks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

    @OneToMany(type => History, (rls) => rls.checks)
    history: History[];
}                        
