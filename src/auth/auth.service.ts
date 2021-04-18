import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ComparePassword } from 'src/security/password';
import { registerDTO } from './users/user.dto';
import { IUser } from './users/users.interface';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string) {
        const user = await this.usersService.findOne(username);
        if (user) {
            if (await ComparePassword(pass, user.password)) {
                return user;
            }
            return null
        }
        return null;
    }

    async login(user) {
        if (user.message) return { message: [user.message] }
        const payload = { username: user.username, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(user: registerDTO): Promise<IUser> {
        return this.usersService.register(user); 
    }
}