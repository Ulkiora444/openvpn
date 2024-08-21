import { Entity, Column, PrimaryGeneratedColumn, } from 'typeorm';

@Entity()
export class Checks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

}                        
