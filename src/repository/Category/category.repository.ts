import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../../core/domain/Category/category.entity";
import { Repository } from "typeorm";
import { DATA_QUERY } from "../../core/querys/querys.constants";
import { DuplicateKeyException } from "../../core/exceptions/DuplicateKeyException";

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>
  ) {}

  async find(): Promise<Category[]>{
      try{
        return await this.repository.query(DATA_QUERY.FIND_CATEGORY);
      }catch (e) {
        throw new e;
      }

  }

  async create(category: Category):Promise<string>{
      try{
        return await this.repository.query(DATA_QUERY.INSERT_CATEGORY,[
          category.name,
          category.status
        ])
      }catch (e) {
        if(e.code == "ER_DUP_ENTRY"){
          throw new DuplicateKeyException;
        }
        throw new e;
      }
  }

  async edit(category: Category){
      try{
        return await this.repository.query(DATA_QUERY.UPDATE_CATEGORY,[
          category.name,
          category.status
        ])
      }catch (e){
        throw new e;
      }
  }

  async findToOne(id: string) {
    try {
      return await this.repository.query(DATA_QUERY.FIND_CATEGORY_ID,[
        id
      ])
    }catch (e) {
      throw new e;
    }
  }

  async delete(id:string){
    try{
      return await  this.repository.query(DATA_QUERY.DELETE_CATEGORY,[id])
    }catch (e) {
      throw new e;
    }
  }


}