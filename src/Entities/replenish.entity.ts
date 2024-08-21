import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Replenish {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('integer')
    usersId: number;

    @Column('double precision')
    money: number;

}                        
