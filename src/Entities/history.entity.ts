import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

}                        
