import stripe from '#services/stripe_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class StripesController {
  async create({ response }: HttpContext) {
    try {
      const account = await stripe.accounts.create({
        country: 'US',
        email: 'jenny.rosen@example.com',
        controller: {
          fees: {
            payer: 'application',
          },
          losses: {
            payments: 'application',
          },
          stripe_dashboard: {
            type: 'express',
          },
        },
      })
      return response.ok(account)
    } catch (error) {}
  }
}
