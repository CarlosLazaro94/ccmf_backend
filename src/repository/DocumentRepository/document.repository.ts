import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Document } from "src/core/domain/Documents/document.entity";
import { Repository } from "typeorm";
import { DATA_QUERY } from "../../core/querys/querys.constants";
import { DuplicateKeyException } from "../../core/exceptions/DuplicateKeyException";

@Injectable()
export class DocumentRepository {
    constructor(
        @InjectRepository(Document)
        private readonly doc: Repository<Document>) {
    }

    async findAllDocument(): Promise<Document[]> {
        try {
            return await this.doc.query(DATA_QUERY.FIND_DOCUMENT);
        } catch (e) {
            console.log(e)
        }
    }

    async create(documentRe: Document): Promise<string>{
        try {
            return await this.doc.query(DATA_QUERY.INSERT_DOCUMENT,[
                documentRe.name,
                documentRe.author,
                documentRe.publish,
                documentRe.idCategory,
                documentRe.description,
                documentRe.fileName,
                documentRe.filePath,
                documentRe.nameImage,
                documentRe.image,
                documentRe.status
            ]);
        }catch (e) {
            if(e.code == "ER_DUP_ENTRY"){
                throw new DuplicateKeyException;
            }
            throw new e;
        }
    }

    async edit(documentRe: Document){
        try {
            return await this.doc.query(DATA_QUERY.UPDATE_DOCUMENT, [
                documentRe.name,
                documentRe.author,
                documentRe.publish,
                documentRe.idCategory,
                documentRe.description,
                documentRe.fileName,
                documentRe.filePath,
                documentRe.nameImage,
                documentRe.image,
                documentRe.status,
                documentRe.id]);
        } catch (e) {
            throw new e;
        }
    }

    async findToOne(id: string){
        try {
            return await this.doc.query(DATA_QUERY.FIND_DOCUMENT_ID, [id]);
        } catch (e) {
            throw new e;
        }
    }

    async delete(id: string){
        try {
            return await this.doc.query(DATA_QUERY.DELETE_DOCUMENT, [id]);
        } catch (e) {
            throw new e;
        }
    }
    
    
}