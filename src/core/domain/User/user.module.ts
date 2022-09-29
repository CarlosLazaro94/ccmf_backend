import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/repository/UserRepository/User.repository";
import { UserServices } from "src/services/UserServices/user.services";
import { User } from "./user.entity";

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers:[UserServices, UserRepository],
    exports: [UserServices]
})

export class UserModule {}