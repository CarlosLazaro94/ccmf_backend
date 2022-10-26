import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany } from "typeorm";
import { Category } from "../Category/category.entity";

@Entity()
export class Document {

    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column()
    name: string;

    @Column()
    author: string;

    @Column()
    publish: string;

    // @ManyToMany(()=>Category,category=>category.id)
    // @JoinColumn({name:"idCategory"})
    @Column()
    idCategory: string;

    @Column()
    description: string;

    @Column()
    fileName: string;

    @Column()
    filePath: string;

    @Column()
    nameImage: string;

    @Column()
    image: string;

    @Column()
    status: string;

}