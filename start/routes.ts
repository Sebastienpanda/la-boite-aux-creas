/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthentificationsController = () => import('#controllers/authentifications_controller')
const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const RenderViewsController = () => import('../app/controllers/render_views_controller.js')

router.group(() => {
  router.get('/', [RenderViewsController, 'showHome']).as('home')
  router.get('/signin', [RenderViewsController, 'showSignin']).as('signin')
  router.get('/login', [RenderViewsController, 'showLogin']).as('login')
  router
    .get('/dashboard', [RenderViewsController, 'showDashboard'])
    .as('dashboard')
    .use(
      middleware.auth({
        guards: ['web'],
      })
    )
})

router
  .group(() => {
    router.post('/signin', [AuthentificationsController, 'createUser'])
    router.post('/login', [AuthentificationsController, 'login'])
  })
  .prefix('api')

router
  .group(() => {
    router.get('/me', [UsersController, 'me'])
    router.post('/logout', [UsersController, 'logout'])
    router.post('/desactivate', [UsersController, 'delete'])
    router.get('restore/:id', [UsersController, 'restore'])
  })
  .prefix('api')
  .use(
    middleware.auth({
      guards: ['web'],
    })
  )
