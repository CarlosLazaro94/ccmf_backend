import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DocumentRepository } from "src/repository/DocumentRepository/document.repository";
import { DocumentService } from "src/services/DocumentServices/document.services";
import { Document } from "./document.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Document])],
    providers: [DocumentService, DocumentRepository],
    exports: [DocumentService]
})

export class DocumentModule { }