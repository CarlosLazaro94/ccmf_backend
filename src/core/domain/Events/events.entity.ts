import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Events {

  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  name: string;

  @Column()
  toEvent: string;

  @Column()
  site: string;

  @Column()
  dateTimeEvent: string;

  @Column()
  contact: string;

  @Column()
  organizedBy: string;

  @Column()
  url: string;

  @Column()
  resume: string;

  @Column()
  nameImage: string;

  @Column()
  image: string;

  @Column()
  status: string;

}