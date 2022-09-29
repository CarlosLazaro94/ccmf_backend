import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Document } from "../domain/Documents/document.entity";
import { Role } from "../domain/Role/role.entity";
import { User } from "../domain/User/user.entity";
import { Events } from "../domain/Events/events.entity";
import { Category } from "../domain/Category/category.entity";


@Module({
    imports:[TypeOrmModule.forRoot(
        {
        type: 'mysql',
        host: 'us-cdbr-east-06.cleardb.net',
        port: 3306,
        username: "b0e46ae6eae9e2",
        password: "b4d33fa7",
        database: "heroku_b9015f6719a9464",
        entities: [User,Document,Role,Events,Category],
        synchronize: true,
        // autoLoadEntities: true
        }),
    ],
})

export class Connection{}