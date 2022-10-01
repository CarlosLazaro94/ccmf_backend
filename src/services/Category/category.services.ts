import { Category } from "../../core/domain/Category/category.entity";
import { CategoryRepository } from "../../repository/Category/category.repository";
import { Injectable } from "@nestjs/common";
import { ServerException } from "../../core/exceptions/ServerException";

@Injectable()
export class CategoryServices {

    constructor(private categoryRepository: CategoryRepository) {
    }

    async createCategory(category: Category) {
      return await this.categoryRepository.create(category)? "CREATE OK" : "NOT CREATE"
    }

    async getCategory(){
      try{
        return await this.categoryRepository.find();
      }catch (e){
        throw new ServerException(e.message);
      }

    }

    async getByIdCategory(params: any ): Promise<Category[]>{
      try{
        return this.categoryRepository.findToOne(params.id)
      } catch (e){
        throw new ServerException(e.message);
      }
    }

    async editCategory(category: Category) {
      try{
        const result = await this.categoryRepository.edit(category[0])
        return result ? "UPDATE OK" : "NOT UPDATE";
      }catch (e){
        throw new ServerException(e.message);
      }
    }

    async deleteCategory(params: any) {
      try {
        const result = await this.categoryRepository.delete(params.id);
        return result.affectedRows == 1 ? "DELETE OK" : "NOT DELETE";
      }catch (e) {
        throw new ServerException(e.message);
      }

    }
}