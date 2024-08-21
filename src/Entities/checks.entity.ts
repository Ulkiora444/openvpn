import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Checks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

}                        
