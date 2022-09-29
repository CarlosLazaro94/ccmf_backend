import { HttpStatus, Injectable } from "@nestjs/common";
import { Document } from "src/core/domain/Documents/document.entity";
import { DocumentRepository } from "src/repository/DocumentRepository/document.repository";
import { accessSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import * as fs from "fs";
import { FileExistException } from "../../core/exceptions/FileExistException";
import { Shared } from "../../Utils/shared";

@Injectable()
export class DocumentService {
    pathDir: string = "D:\\tmp\\data\\fileUploads\\"
    pathImages: string = "D:\\tmp\\data\\imagesUploads\\"
    shared: Shared
    constructor(
        private documentRepository: DocumentRepository) {
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
        await this.saveEdit(params.fileName, params.base, this.pathDir);
        await this.saveEdit(params.nameImage, params.image, this.pathImages);
        const doc = this.buildDocument(params);
        doc.status = params.status;
        doc.id = params.id
        return await this.documentRepository.edit(doc) ? "UPDATE OK" : "NOT UPDATE";
    }

    async deleteDocument(params: any){
        const result = await this.documentRepository.delete(params.id)
        return result.affectedRows == 1 ? "DELETE OK" : "NOT DELETE";
    }

    async createDocument(params: any){
        try{
            params.base ? await this.saveCreate(params.fileName, params.base, this.pathDir) : "";
            params.image ? await this.saveCreate(params.nameImage, params.image, this.pathImages): "";
            const doc = this.buildDocument(params);
            doc.status = "1";
            return await this.documentRepository.create(doc) ? "CREATE OK" : "NOT CREATED";
        }catch (e){
            if(e.status == HttpStatus.FORBIDDEN){
                throw new FileExistException();
            }
            throw new e;
        }

    }

    async download(id: string){
        try{
            const data = await this.documentRepository.findToOne(id);
            const file = this.getFile(`${this.pathDir}`+data[0].fileName);
            return {
                name: data[0].fileName,
                file: file.toString()
            };
        }catch (e){
            throw new e;
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
                writeFileSync(`${pathRouter}`+ fileName, dataBuffer
                    .toString("ascii"),{
                      encoding: "utf-8"
                  }
                );
            }else{
                writeFileSync(`${pathRouter}`+ fileName, dataBuffer);
            }
        }catch (e) {
            throw e;
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
                    .toString("ascii"), {
                      encoding: "utf-8"
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
            return readFileSync(path, { encoding:"utf-8"});
        }catch (e) {
            return e.message
        }
    }


    private buildDocument(params: any){
        const doc = new Document();
        doc.name = params.name ? params.name : "" ;
        doc.author = params.author ?  params.author : "";
        doc.publish = params.publish ?  params.publish : "";
        doc.idCategory = params.idCategory ?  params.idCategory : "";
        doc.fileName = params.fileName ? params.fileName : "";
        doc.description = params.description ? params.description : "";
        doc.filePath = params.fileName ?  this.pathDir + params.fileName : "";
        doc.nameImage = params.nameImage ? params.nameImage : "";
        doc.image = params.nameImage ? this.pathImages + params.nameImage : "";
        return doc;
    }

}
