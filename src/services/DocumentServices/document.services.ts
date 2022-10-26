import { HttpStatus, Injectable } from "@nestjs/common";
import { Document } from "src/core/domain/Documents/document.entity";
import { DocumentRepository } from "src/repository/DocumentRepository/document.repository";
import * as fs from "fs";
import { accessSync, existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from "fs";
import { FileExistException } from "../../core/exceptions/FileExistException";
import { Shared } from "../../Utils/shared";
import { ServerException } from "../../core/exceptions/ServerException";
import * as  moment from "moment-timezone";
import { EventsRepository } from "../../repository/EventsRepository/events.repository";


@Injectable()
export class DocumentService {
    pathDir: string = "D:\\tmp\\data\\fileUploads\\";
    pathImages: string = "D:\\tmp\\data\\imagesUploads\\";
    pathEvents: string = "D:\\tmp\\data\\imagesEvents\\";
    shared: Shared;
    constructor(
        private documentRepository: DocumentRepository, private eventRepository: EventsRepository) {
            this.shared =  new Shared();
    }

    async getDocuments(): Promise<Document[]> {
        const result =  await this.documentRepository.findAllDocument();
        result.map(el => {
                el.image = this.shared.getFileBase64(el.image) ? this.shared.getFileBase64(el.image) : "NO EXIST" ;
        })
        return result;
    }

    async getDocumentById(params: any){
        const result = await this.documentRepository.findToOne(params.id);
        result.map(el => {
            el.image = this.shared.getFileBase64(el.image) ? this.shared.getFileBase64(el.image) : "NO EXIST" ;
        })
        return result;
    }

    async editDocument(params : any){
        try {
            // const data = await this.documentRepository.findToOne(params.id)
            const dateform = Date.now().toString();
            const doc = this.buildDocument(params, dateform);
            doc.status = params.status;
            doc.id = params.id
            const result = await this.documentRepository.edit(doc) ? "UPDATE OK" : "NOT UPDATE"
            await this.saveEdit(this.fileName(params.fileName,dateform), params.base, this.pathDir);
            await this.saveEdit(this.fileName(params.nameImage,dateform), params.image, this.pathImages);
            return result;
        }catch (e){
            throw new ServerException(e.message);
        }
    }

    async deleteDocument(params: any){
        const document = await this.documentRepository.findToOne(params.id);
        const result = await this.documentRepository.delete(params.id);
        const filePath= document[0].filePath;
        unlinkSync(filePath)
        return result.affectedRows == 1 ? "DELETE OK" : "NOT DELETE";
    }

    async createDocument(params: any){
        try{
            const dateform = Date.now().toString()
            const doc = this.buildDocument(params, dateform);
            doc.status = "1";
            const result =  await this.documentRepository.create(doc) ? "CREATE OK" : "NOT CREATED";
            params.base ? await this.saveCreate(this.fileName(params.fileName, dateform), params.base, this.pathDir) : "";
            params.image ? await this.saveCreate(this.fileName(params.nameImage, dateform), params.image, this.pathImages): "";
            return result;
        }catch (e) {
            if (e.status == HttpStatus.FORBIDDEN) {
                throw new FileExistException();
            }
            throw new ServerException(e.message);
        }
    }

    async download(id: any, typeData: string){
        try{
            const data = await this.documentRepository.findToOne(id.id);
            let fileName = ""
            let file;
            switch(typeData){
                case "pdf":
                    fileName = data[0].fileName
                    file = this.getFile(`${this.pathDir}`+ fileName);
                    break;
                case "img":
                    fileName = data[0].nameImage
                    file = this.getImage(`${this.pathImages}`+fileName);
                    break;
                case "event":
                    const repoEvents = await this.eventRepository.findToOne(id.id)
                    fileName = repoEvents[0].nameImage
                    file = this.getImage(`${this.pathEvents}`+ repoEvents[0].nameImage);
                    break;
            }
            return {
                name: fileName,
                file: file
            };
        }catch (e){
            throw new ServerException(e.message);
        }
    }

    private async saveCreate(fileName: string, data: string, pathRouter: string){
        this.shared.createDir(pathRouter)
        const dataBuffer = Buffer.from(data,"base64");
        accessSync(`${pathRouter}`,fs.constants.F_OK)
        const exits = existsSync(`${pathRouter}`+ fileName) ;
        if(!exits){
            this.save(pathRouter,fileName,dataBuffer)
        }else{
           throw new FileExistException();
        }
    }


    private save(pathRouter:string, fileName: string, dataBuffer: any ){
        try{
            if(pathRouter == this.pathDir){
                writeFileSync(
                  `${pathRouter}`+ fileName,
                    dataBuffer,{ encoding: "binary" }
                );
            }else{
                writeFileSync(`${pathRouter}`+ fileName, dataBuffer);
            }
        }catch (e) {
            throw new ServerException(e.message);
        }
    }

    private saveEdit(fileName: string, data: string, pathRouter: string) {
        const dataBuffer = Buffer.from(data, "base64");
        mkdirSync(pathRouter, { recursive: true })
        accessSync(`${pathRouter}`, fs.constants.F_OK)
        const exits = existsSync(`${pathRouter}` + fileName);
        if (!exits) {
            if (pathRouter == this.pathDir) {
                writeFileSync(`${pathRouter}` + fileName, dataBuffer
                    , {
                      encoding: "binary"
                  }
                );
            } else {
                writeFileSync(`${pathRouter}` + fileName, dataBuffer);
            }
        }
    }

    private getFile(path: string){
        try{
            accessSync(path)
            return readFileSync(path, { encoding:"binary"});
        }catch (e) {
            throw new ServerException(e.message);
        }
    }

    private getImage(path: string){
        try{
            accessSync(path)
            return   readFileSync(path,{encoding:'binary'});
        }catch (e) {
            throw new ServerException(e.message);
        }

    }
    private buildDocument(params: any, dateform :string ){
        const doc = new Document();
        doc.name = params.name ? params.name : "" ;
        doc.author = params.author ?  params.author : "";
        doc.publish = params.publish ?  params.publish : "";
        doc.idCategory = params.idCategory ?  params.idCategory : "";
        doc.fileName = params.fileName ? this.fileName(params.fileName,dateform) : "";
        doc.description = params.description ? params.description : "";
        doc.filePath = params.fileName ?  this.pathDir + this.fileName(params.fileName,dateform) : "";
        doc.nameImage = params.nameImage ? this.fileName(params.nameImage,dateform) : "";
        doc.image = params.nameImage ? this.pathImages + this.fileName(params.nameImage,dateform) : "";
        return doc;
    }

    private fileName(fileName: String, dateForm:string){
        const result = fileName.split(".")
        const name = result[0];
        const mineType = result[1];
        return name + "-" + dateForm + "." + mineType;
    }
}
