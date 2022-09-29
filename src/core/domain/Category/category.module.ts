import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { CategoryServices } from "../../../services/Category/category.services";
import { CategoryRepository } from "../../../repository/Category/category.repository";

@Module({
  imports:[TypeOrmModule.forFeature([Category])],
  providers:[CategoryServices, CategoryRepository],
  exports: [CategoryServices]
})

export class CategoryModule {}