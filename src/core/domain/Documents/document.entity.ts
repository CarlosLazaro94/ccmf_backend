import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Category } from "../Category/category.entity";

@Entity()
export class Document {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    author: string;

    @Column()
    publish: string;

    @ManyToOne(()=>Category,category=>category.id)
    @JoinColumn({name:"idCategory"})
    idCategory: Category;

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