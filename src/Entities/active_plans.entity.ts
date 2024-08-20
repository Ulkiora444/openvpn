import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Active_Plans {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('integer')
    usersId: number;

    @Column('integer')
    plansId: number;

    @Column('timestamp with time zone')
    startDate: Date;

    @Column('timestamp with time zone')
    endDate: Date;

    @Column('text')
    file: string;

}                        
