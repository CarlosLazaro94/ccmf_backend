import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentRepository } from "src/repository/DocumentRepository/document.repository";
import { DocumentService } from "src/services/DocumentServices/document.services";
import { Document } from "./document.entity";
import { EventsModule } from "../Events/events.module";

@Module({
    imports: [TypeOrmModule.forFeature([Document]), EventsModule],
    providers: [DocumentService, DocumentRepository],
    exports: [DocumentService]
})

export class DocumentModule { }