import User from '#models/user'
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
}
