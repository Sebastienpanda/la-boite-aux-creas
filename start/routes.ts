/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthentificationsController = () => import('#controllers/authentifications_controller')
import router from '@adonisjs/core/services/router'
router.on('/').renderInertia('home')
router
  .group(() => {
    router.post('/signin', [AuthentificationsController, 'createUser'])
  })
  .prefix('api')
