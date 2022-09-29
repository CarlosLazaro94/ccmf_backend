
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, Unique, OneToMany, ManyToOne} from 'typeorm';
import { Role } from '../Role/role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Unique("uniqueUsername",['user'])
    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    lastName: string;

    @Column()
    mail: string;

    @ManyToOne(()=>Role,role=>role.id)
    @JoinColumn({name:"idRole"})
    idRole: Role;

    @Column()
    phone: string;

    @Column()
    status: string;
}