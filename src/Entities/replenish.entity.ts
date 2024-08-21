import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Replenish {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('integer')
    usersId: number;

    @Column('double precision')
    money: number;

    @ManyToOne(type => Users, (rls) => rls.replenish)
    users: Users;
}                        
