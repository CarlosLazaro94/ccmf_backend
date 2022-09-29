import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./role.entity";
import { RoleServices } from "../../../services/RoleServices/role.services";
import { RoleRepository } from "../../../repository/RoleRepository/role.repository";

@Module({
  imports:[TypeOrmModule.forFeature([Role])],
  providers:[RoleServices, RoleRepository],
  exports: [RoleServices]
})

export class RoleModule{}