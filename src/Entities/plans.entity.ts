import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

}                        
