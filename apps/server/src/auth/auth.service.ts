import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Credentials, Jwt, User } from 'api';
import { UserService } from '../user/user.service.js';
import * as argon from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly config: ConfigService,
        private readonly jwt: JwtService
    ) {
        this.secret = this.config.get('JWT_SECRET')
    }

    secret: string

    async signUp(body): Promise<any> {
        const { password, match, ...rest } = body
        const hash = await argon.hash(password)

        const user = { ...rest, hash }
        return this.userService.register(user)
    }

    async signIn(body: Credentials): Promise<Jwt> {
        const user = await this.findUserWithCredentials(body)
        if (user) {
            return await this.signAccessToken(user)
        } else {
            throw new UnauthorizedException('Die angegebenen Nutzerdaten sind nicht korrekt.')
        }
    }

    async findUserWithCredentials(credentials: Credentials) {
        const { username, password } = credentials
        const user = await this.userService.findOne(username)
        const match = await argon.verify(user.hash, password)
        return match ? user : null
    }

    async signAccessToken(user: User): Promise<Jwt> {
        const payload = { ...user, sub: user.id }
        const token = await this.jwt.signAsync(
            payload, 
            { expiresIn: '30m', secret: this.secret }
        )
        return { "access-token": token }
    }
}
