import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthEntity } from "src/core/domain/Auth/auth.entity";
import { DATA_QUERY } from "src/core/querys/querys.constants";
import { Repository } from "typeorm";

@Injectable()
export class AuthRepository {
    constructor(
        @InjectRepository(AuthEntity)
        private repository: Repository<AuthEntity>) { }

    async authorizationRepository(username: string, password: string): Promise<AuthEntity> {
        try {
            const validated = await this.repository.query(DATA_QUERY.VALIDATED_USER, [username, password]);
            const result = validated.map(el => {
                return {
                    username: el.username,
                    password: el.password
                }
            })
            return result[0];
        } catch (e) {
            throw e;
        }
    }
}