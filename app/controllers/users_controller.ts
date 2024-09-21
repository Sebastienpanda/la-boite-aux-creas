import { UserRepository } from '#repositories/user_repositorie'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async me({ response, auth }: HttpContext) {
    try {
      const user = await this.userRepository.getByUserAuth(auth)

      return response.ok(user)
    } catch (error) {
      console.log(error)
      return response.badRequest(error)
    }
  }
}
