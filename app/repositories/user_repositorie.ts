import User from '#models/user'
import type { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { DateTime } from 'luxon'

export class UserRepository {
  async createUser(data: {
    pseudo: string
    email: string
    password: string
    avatar?: string
    creator?: boolean
    role?: number
    emailVerified?: boolean
    verificationCode?: string
    verificationCodeExpiresAt?: DateTime | null
  }): Promise<User> {
    const user = await User.create({
      pseudo: data.pseudo,
      email: data.email,
      password: data.password,
      avatar: data.avatar || null,
      creator: data.creator ?? false,
      role: data.role ?? 0, // Par défaut, rôle 'User'
      emailVerified: data.emailVerified ?? false,
      verificationCode: data.verificationCode || null,
      verificationCodeExpiresAt: data.verificationCodeExpiresAt || null,
    })

    return user
  }

  async getByUserAuth(auth: Authenticator<Authenticators>): Promise<User> {
    const user = await auth.authenticate()

    return user
  }

  async postLogin(
    email: string,
    password: string,
    auth: Authenticator<Authenticators>
  ): Promise<User> {
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return user
  }

  async postDelete(auth: Authenticator<Authenticators>): Promise<{}> {
    const userAuth = await this.getByUserAuth(auth)

    const user = await User.findBy('email', userAuth.email)

    if (user) {
      user.deletedAt = DateTime.now()

      await user.save()

      await auth.use('web').logout()
    }

    return {}
  }

  async postRestore(id: string, auth: Authenticator<Authenticators>): Promise<User | null> {
    const user = await User.findBy('id', id)

    if (user) {
      user.deletedAt = null

      await user.save()

      await auth.use('web').login(user)

      return user
    }

    return null
  }
}
