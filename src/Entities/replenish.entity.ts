import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Replenish {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('integer')
    usersId: number;

    @Column('double precision')
    money: number;

}                        
