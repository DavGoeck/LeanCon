import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { apiContract } from 'api';
import { created, ok } from '../utils/http';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TsRestHandler(apiContract.auth)
  async handle() {
    return tsRestHandler(apiContract.auth, {
      signUp: async ({ body }) => {
        const user = await this.authService.signUp(body)
        return created(user)
      },
      signIn: async ({ body }) => {
        const user = await this.authService.signIn(body)
        return ok(user)
      }
    })
  }
}
