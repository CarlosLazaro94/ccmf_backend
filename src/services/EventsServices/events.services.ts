import { EventsRepository } from "../../repository/EventsRepository/events.repository";
import { Shared } from "../../Utils/shared";
import { accessSync, writeFileSync } from "fs";
import * as fs from "fs";
import { Events } from "../../core/domain/Events/events.entity";
import { Injectable } from "@nestjs/common";
import { ServerException } from "../../core/exceptions/ServerException";

@Injectable()
export class EventsServices {

  PATH: string = "D:\\tmp\\data\\imagesEvents\\"
  shared: Shared;
  constructor(
    private eventRepository:EventsRepository) {
      this.shared= new Shared();
  }


  async getEvents(){
      try{
        const result = await  this.eventRepository.find();
        result.map(el=> {
          el.image = this.shared.getFileBase64(el.image) ? this.shared.getFileBase64(el.image) : "NO EXIST" ;
        })
        return result;
      }catch (e) {
        throw new ServerException(e.message);
      }

  }

  async getEventId(params: any){
    try{
      const result = await  this.eventRepository.findToOne(params.id);
      result.map(el=> {
        el.image = this.shared.getFileBase64(el.image) ? this.shared.getFileBase64(el.image) : "NO EXIST" ;
      })
      return result;
    }catch (e) {
      throw new ServerException(e.message);
    }
  }

  async createEvents(params: any){
    try{
      params.image ? await  this.saveImage(params.nameImage, params.image) : "";
      const event = this.buildEvent(params)
      return await this.eventRepository.create(event) ? "CREATE OK" : "NOT CREATED";
    }catch (e){
      throw new ServerException(e.message);
    }
  }

  async editEvent(params : any){
    try{
      params.image ?  await this.saveImage(params.nameImage, params.image) : "";
      const event = this.buildEvent(params);
      event.status = params.status;
      event.id = params.id
      return await this.eventRepository.edit(event) ? "UPDATE OK" : "NOT UPDATE";
    }catch (e) {
      throw new ServerException(e.message);
    }

  }

  async deleteEvent(params: any){
    try{
      const result = await this.eventRepository.delete(params.id)
      return result.affectedRows == 1 ? "DELETE OK" : "NOT DELETE";
    }catch (e) {
      throw new ServerException(e.message);
    }
  }

  private async saveImage(fileName: string, data: string){
    try{
      this.shared.createDir(this.PATH)
      const dataBuffer = Buffer.from(data,"base64");
      accessSync(`${this.PATH}`,fs.constants.F_OK)
      writeFileSync(`${this.PATH}`+ fileName, dataBuffer);
    }catch (e) {
      throw new ServerException(e.message);
    }
  }

  private buildEvent(params: any){
    const event = new Events();
    event.name= params.name ? params.name : "";
    event.toEvent= params.toEvent ? params.toEvent : "";
    event.site= params.site ? params.site : "";
    event.dateTimeEvent= params.dateTimeEvent ? params.dateTimeEvent : "";
    event.contact= params.contact ? params.contact : "";
    event.organizedBy= params.organizedBy ? params.organizedBy : "";
    event.url= params.url ? params.url : "";
    event.resume= params.resume ? params.resume : "";
    event.nameImage= params.nameImage ? params.nameImage : "";
    event.image= params.image ? this.PATH + params.nameImage : "";
    event.status=event.status ? event.status :  "1";
    return event;
  }
}