import { InjectRepository } from "@nestjs/typeorm";
import { Events } from "../../core/domain/Events/events.entity";
import { Repository } from "typeorm";
import { DATA_QUERY } from "../../core/querys/querys.constants";
import { DuplicateKeyException } from "../../core/exceptions/DuplicateKeyException";

export class EventsRepository {
    constructor(
      @InjectRepository(Events)
      private readonly  repository:Repository<Events>
    ) {
    }

    async find(){
      try{
        return await this.repository.query(DATA_QUERY.FIND_EVENT)
      }catch (e) {
        throw new e;
      }
    }

    async findToOne(id: string){
      try{
        return await this.repository.query(DATA_QUERY.FIND_EVENT_ID,[id])
      }catch (e) {
        throw new e;
      }
    }

    async create(event: Events){
      try {
        return await this.repository.query(DATA_QUERY.INSERT_EVENT,[
          event.name,
          event.toEvent,
          event.site,
          event.dateTimeEvent,
          event.contact,
          event.organizedBy,
          event.url,
          event.resume,
          event.nameImage,
          event.image,
          event.status
        ])
      }catch (e) {
        if(e.code == "ER_DUP_ENTRY"){
          throw new DuplicateKeyException;
        }
        throw new e;
      }

    }

    async edit(event: Events){
      try{
        return await this.repository.query(DATA_QUERY.UPDATE_EVENT,[
          event.name,
          event.toEvent,
          event.site,
          event.dateTimeEvent,
          event.contact,
          event.organizedBy,
          event.url,
          event.nameImage,
          event.image,
          event.status,
          event.id
        ])
      }catch (e) {
        throw new e;
      }
    }

    async delete(id:string){
      try{
        return await  this.repository.query(DATA_QUERY.DELETE_EVENT,[id])
      }catch (e) {
        throw new e;
      }
    }

}