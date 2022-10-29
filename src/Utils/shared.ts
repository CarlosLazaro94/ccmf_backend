import { accessSync, mkdirSync, readFileSync } from "fs";

export class Shared {


  public createDir(pathRouter: string){
    mkdirSync(pathRouter,{recursive: true})
  }

  public getFileBase64(path: string){
    try {
      accessSync(path)
      const result =  readFileSync(path,{encoding:"base64"});
      // const data = Buffer.from(result).toString('base64');
      // const data2 = Buffer.from(data, "binary").toString('base64');
      return result;
    }catch (e){
      return e.message;
    }
  }


}