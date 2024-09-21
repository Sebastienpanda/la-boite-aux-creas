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
router.on('/').renderInertia('home')
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
    router.delete('/delete', [UsersController, 'delete'])
    router.get('restore/:id', [UsersController, 'restore'])
  })
  .prefix('api')
  .use(
    middleware.auth({
      guards: ['web'],
    })
  )
