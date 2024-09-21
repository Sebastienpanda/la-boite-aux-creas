import type { HttpContext } from '@adonisjs/core/http'

export default class RenderViewsController {
  async showHome({ inertia, auth }: HttpContext) {
    return inertia.render('home', {
      users: auth.user,
    })
  }

  async showSignin({ inertia, request }: HttpContext) {
    console.log(request.csrfToken)
    return inertia.render('auth/signin', {
      csrfToken: request.csrfToken,
    })
  }

  async showLogin({ inertia, request }: HttpContext) {
    return inertia.render('auth/login', {
      csrfToken: request.csrfToken,
    })
  }

  async showDashboard({ inertia }: HttpContext) {
    return inertia.render('users/dashboard')
  }
}
