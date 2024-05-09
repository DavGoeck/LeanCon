import { Controller, Request, UseGuards } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { User, apiContract } from 'api';
import { AuthGuard } from '@nestjs/passport';
import { ok } from '../utils/http';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class UserController {
    @TsRestHandler(apiContract.user)
    async handle(@Request() req) {
        return tsRestHandler(apiContract.user, {
            me: async () => {
                const user: User = req.user
                return ok(user)
            }
        })
    }
}
