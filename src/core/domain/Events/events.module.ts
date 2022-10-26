import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Events } from "./events.entity";
import { EventsServices } from "../../../services/EventsServices/events.services";
import { EventsRepository } from "../../../repository/EventsRepository/events.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Events])],
  providers: [EventsServices, EventsRepository],
  exports: [EventsServices,EventsRepository]
})

export class EventsModule { }