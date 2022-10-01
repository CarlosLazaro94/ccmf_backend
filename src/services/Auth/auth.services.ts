import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRepository } from "src/repository/AuthRepository/auth.repository";
import { ServerException } from "../../core/exceptions/ServerException";

@Injectable()
export class AuthorizationService {
    constructor(private authRepository: AuthRepository, private jwtService: JwtService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
    }

    async validateUser(username: string, pass: string): Promise<any> {
        try{
            const user = await this.authRepository.authorizationRepository(username, pass)

            if (user && user.password === pass) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        }catch (e) {
            throw new ServerException(e.message);
        }

    }

    async login(username: any) {
        const payload = { username: username.user, sub: username.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
} 