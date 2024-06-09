import { db } from '#database/db'
import { Users } from '#database/schema'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class AuthController {
  static validator = vine.compile(
    vine.object({
      email: vine.string().email(),
      password: vine.string(),
    })
  )

  /**
   * @login
   * @operationId login
   * @description Returns array of producs and it's relations
   * @responseBody 200 - <User[]>
   * @responseBody 400 - Invalid credentials
   */
  async login(_: HttpContext): Promise<User[]> {
    // const { email, password } = await request.validateUsing(AuthController.validator)

    // const user = await User.verifyCredentials(email, password)

    // await auth.use('web').login(user)

    // return user.related('todos').query()

    return db.select().from(Users)
  }
}
