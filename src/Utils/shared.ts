import { accessSync, mkdirSync, readFileSync } from "fs";

export class Shared {


  public createDir(pathRouter: string){
    mkdirSync(pathRouter,{recursive: true})
  }

  public getFileBase64(path: string){
    try {
      accessSync(path)
      return readFileSync(path, { encoding:"base64"});
    }catch (e){
      return e.message
    }
  }


}