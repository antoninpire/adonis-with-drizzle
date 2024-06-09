import { db } from '#database/db'
import { User, Users } from '#database/schema'
import { symbols } from '@adonisjs/auth'
import type { SessionGuardUser, SessionUserProviderContract } from '@adonisjs/auth/types/session'
import { eq } from 'drizzle-orm'

export class SessionDrizzleUserProvider implements SessionUserProviderContract<User> {
  declare [symbols.PROVIDER_REAL_USER]: User

  async createUserForGuard(user: User): Promise<SessionGuardUser<User>> {
    return {
      getId() {
        return user.id
      },
      getOriginal() {
        return user
      },
    }
  }

  async findById(identifier: string): Promise<SessionGuardUser<User> | null> {
    const user = await db.select().from(Users).where(eq(Users.id, identifier)).get()

    if (!user) {
      return null
    }

    return this.createUserForGuard(user)
  }
}
