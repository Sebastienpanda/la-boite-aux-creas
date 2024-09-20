import { BaseSchema } from '@adonisjs/lucid/schema'
import { UserRole } from '../../types/user_role.js'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    await this.raw('create extension IF NOT EXISTS "uuid-ossp" schema pg_catalog version "1.1";')

    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id', { primaryKey: true })
        .defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)
      table.string('pseudo', 30).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('avatar', 255).nullable()
      table.boolean('creator').defaultTo(false)
      table.integer('role').notNullable().defaultTo(UserRole.User)
      table.boolean('email_verified').defaultTo(false)
      table.string('verification_code').nullable()
      table.timestamp('verification_code_expires_at').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('deleted_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP EXTENSION IF EXISTS "uuid-ossp"')
  }
}
