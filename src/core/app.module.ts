import { Module } from '@nestjs/common';
import { AppController } from 'src/controller/app.controller';
import { Message } from './app/message.utils';
import { AuthModule } from './domain/Auth/auth.module';
import { Connection } from './dataBase/conection';
import { DocumentModule } from './domain/Documents/document.module';
import { UserModule } from './domain/User/user.module';
import { RoleModule } from "./domain/Role/role.module";
import { CategoryModule } from "./domain/Category/category.module";
import { EventsModule } from "./domain/Events/events.module";

@Module({
  imports: [Connection,UserModule,DocumentModule,RoleModule,DocumentModule,AuthModule,EventsModule, CategoryModule],
  providers: [Message],
  controllers: [AppController]
})
export class AppModule {}
