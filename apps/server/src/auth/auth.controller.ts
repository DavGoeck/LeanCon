import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { apiContract } from 'api';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TsRestHandler(apiContract.auth)
  async handle() {
    return tsRestHandler(apiContract.auth, {
      signUp: async ({ body }) => {
        return {
          status: 201,
          body: await this.authService.signUp(body)
        }
      },
      signIn: async ({ body }) => {
        return {
          status: 200,
          body: await this.authService.signIn(body)
        }
      }
    })
  }
}
