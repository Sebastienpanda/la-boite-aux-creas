import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const UserValidator = vine.compile(
  vine.object({
    pseudo: vine
      .string()
      .trim()
      .maxLength(50)
      .unique(async (db, value) => {
        const exists = await db.from('users').where('pseudo', value).first()
        return !exists
      }),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        const exists = await db.from('users').where('email', value).first()
        return !exists
      }),
    password: vine.string().trim().minLength(12),
  })
)

export const ResetPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'The {{ field }} field is required',
  'pseudo.database.unique': '{{ field }} already exists',
  'email.database.unique': '{{ field }} already exists',
})
