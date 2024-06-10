import { ApiResponse, contract } from '#core/contract'
import { db } from '#database/db'
import { Users } from '#database/schema'
import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import { z } from 'zod'

export default class AuthController {
  static validator = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  /**
   * @login
   * @operationId login
   * @description Returns array of producs and it's relations
   * @requestBody <User>.only(email, password)
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

  async getUser(_: HttpContext): Promise<ApiResponse<'getUser'>> {
    return {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'John Doe',
      phoneNumber: '555-555-5555',
    }
  }

  async updateUser({ request }: HttpContext): Promise<ApiResponse<'updateUser'>> {
    const body = contract.updateUser.body.parse(request.body)

    console.log(body)

    return {
      id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'John Doe',
      phoneNumber: '555-555-5555',
    }
  }
}
