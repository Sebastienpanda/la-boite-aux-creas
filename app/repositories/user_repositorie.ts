import User from '#models/user'
import { UserRole } from '#types/user_role'
import { UserSchema } from '#types/users_schema'
import type { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { DateTime } from 'luxon'

export class UserRepository {
  // Functions Authenticated User
  async getAuthenticatedUser(auth: Authenticator<Authenticators>): Promise<User> {
    const user = await auth.authenticate()

    return user
  }

  async loginUserSession(user: User, auth: Authenticator<Authenticators>): Promise<void> {
    await auth.use('web').login(user)
  }

  async logoutUserSession(auth: Authenticator<Authenticators>): Promise<void> {
    await auth.use('web').logout()
  }

  // CRUD Users
  async createUser(data: UserSchema): Promise<User> {
    const user = await User.create({
      pseudo: data.pseudo,
      email: data.email,
      password: data.password,
      role: data.role ?? UserRole.User,
    })

    return user
  }

  async loginUser(
    email: string,
    password: string,
    auth: Authenticator<Authenticators>
  ): Promise<User> {
    const user = await User.verifyCredentials(email, password)

    await this.loginUserSession(user, auth)

    return user
  }

  async softDeleteUser(
    auth: Authenticator<Authenticators>
  ): Promise<{ success: boolean; message: string }> {
    const userAuth = await this.getAuthenticatedUser(auth)

    const user = await User.findBy('email', userAuth.email)

    if (user) {
      user.deletedAt = DateTime.now()

      await user.save()

      await this.logoutUserSession(auth)
    }

    return { success: true, message: 'User soft deleted  and logget out' }
  }

  async restoreUser(id: string, auth: Authenticator<Authenticators>): Promise<User | null> {
    const user = await User.findBy('id', id)

    if (user && user.deletedAt) {
      user.deletedAt = null

      await user.save()

      await this.loginUserSession(user, auth)

      return user
    }

    return null
  }
}
