import { UserRepository } from '#repositories/user_repositorie'
import { UserRole } from '#types/user_role'
import { UserSchema } from '#types/users_schema'
import { UserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthentificationsController {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async createUser({ request, response, auth }: HttpContext) {
    try {
      const payload: UserSchema = await request.validateUsing(UserValidator)

      const user = await this.userRepository.createUser({
        pseudo: payload.pseudo,
        email: payload.email,
        password: payload.password,
        role: UserRole.User,
      })

      await auth.use('web').login(user)

      return response.created(user)
    } catch (error) {
      return response.unprocessableEntity(error.messages)
    }
  }

  async login({ request, response, auth }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])

      const user = await this.userRepository.postLogin(email, password, auth)

      if (user.deletedAt !== null) {
        return response.ok({
          message: 'Account deleted',
        })
      }

      return response.ok(user)
    } catch (error) {}
  }
}
