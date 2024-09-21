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
      const user = await this.userRepository.getAuthenticatedUser(auth)

      return response.ok(user)
    } catch (error) {
      console.log(error)
      return response.badRequest(error)
    }
  }

  async delete({ response, auth }: HttpContext) {
    try {
      await this.userRepository.softDeleteUser(auth)
      return response.noContent()
    } catch (error) {
      console.log(error)
    }
  }

  async logout({ auth, response }: HttpContext) {
    try {
      await this.userRepository.logoutUserSession(auth)
      return response.ok({
        success: true,
      })
    } catch (error) {
      console.log(error)
    }
  }

  async restore({ auth, response, request }: HttpContext) {
    try {
      const id = request.param('id')

      const user = await this.userRepository.restoreUser(id, auth)

      return response.ok(user)
    } catch (error) {}
  }
}
