import { Controller, Request, UseGuards } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { User, apiContract } from 'api';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('jwt'))
export class UserController {
    @TsRestHandler(apiContract.user)
    async handle(@Request() req) {
        return tsRestHandler(apiContract.user, {
            me: async () => ({
                status: 200,
                body: req.user
            })
        })
    }
}
