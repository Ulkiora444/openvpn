import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    phone: string;

    @Column('text')
    email: string;

    @Column('text')
    password: string;

    @Column('text')
    username: string;

    @Column('text')
    name: string;

    @Column('double precision')
    money: number;

    @Column('boolean')
    isDelete: boolean;

    @Column('integer')
    rolesId: number;
}                        
