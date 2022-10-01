import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/core/domain/User/user.entity";
import { Repository } from "typeorm";
import { DATA_QUERY } from 'src/core/querys/querys.constants'
import { DuplicateKeyException } from "src/core/exceptions/DuplicateKeyException";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly user: Repository<User>
    ) { }

    async createUser(user: User): Promise<string> {
        try {
            return await this.user.query(DATA_QUERY.INSERT_USER, [
            user.username,
            user.password,
            user.name,
            user.lastName,
            user.mail,
            user.idRole,
            user.phone,
            user.status,
            user.id]);
        } catch (e) {
            if(e.code == "ER_DUP_ENTRY"){
                throw new DuplicateKeyException;
            }
            throw e;
        }
    }

    async findByIdUser(id: string): Promise<User[]> {
        try {
            return await this.user.query(DATA_QUERY.SELECT_ID_USER, [id]);
        } catch (e) {
            throw e;
        }
    }

    async findAllUser(): Promise<User[]> {
        try {
            return await this.user.query(DATA_QUERY.FIND_ALL_USER);
        } catch (e) {
            throw e;
        }
    }

    async editUser(user: User): Promise<Boolean> {
        try {
            return await this.user.query(DATA_QUERY.UPDATE_USER, [
                user.username,
                user.password,
                user.name,
                user.lastName,
                user.mail,
                user.idRole,
                user.phone,
                user.status,
                user.id]) == 1 ;
        } catch (e) {
            throw e;
        }
    }

    async deleteUser(id: String) {
        try {
            return await this.user.query(DATA_QUERY.DELETE_USER, [id]);
        } catch (e) {
            throw e;
        }
    }

  
}