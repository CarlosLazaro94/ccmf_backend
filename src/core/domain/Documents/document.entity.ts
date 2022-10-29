import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import { Category } from "../Category/category.entity";

@Entity()
export class Document {

    @PrimaryGeneratedColumn('increment',{type: "int"})
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