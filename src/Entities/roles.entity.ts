import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    name: string;

}                        
