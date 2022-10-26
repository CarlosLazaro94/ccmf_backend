import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column()
    name: string;

    @Column()
    status: string;
}