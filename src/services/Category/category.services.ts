import { Category } from "../../core/domain/Category/category.entity";
import { CategoryRepository } from "../../repository/Category/category.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryServices {

    constructor(private categoryRepository: CategoryRepository) {
    }

    async createCategory(category: Category) {
      return await this.categoryRepository.create(category)? "CREATE OK" : "NOT CREATE"
    }

    async getCategory(){
      return await this.categoryRepository.find();
    }

    async getByIdCategory(params: any ): Promise<Category[]>{
      return this.categoryRepository.findToOne(params.id)
    }

    async editCategory(category: Category){
      const result = await  this.categoryRepository.edit(category[0])
      return result ? "UPDATE OK" : "NOT UPDATE";
    }

    async deleteCategory(params: any) {
      const result = await this.categoryRepository.delete(params.id);
      return result.affectedRows == 1 ? "DELETE OK" : "NOT DELETE";
    }
}