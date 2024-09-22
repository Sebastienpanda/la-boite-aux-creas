import app from '@adonisjs/core/services/app'

const stripe = await app.container.make('stripe.manager')
export { stripe as default }
