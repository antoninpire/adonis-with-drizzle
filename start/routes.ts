import { contract, openApiDocument } from '#core/contract'
import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')

router.get('/', async () => {
  return {
    health: 'ok',
  }
})

router.group(() => {
  router.post('/login', [AuthController, 'login'])
  router.get(contract.getUser.path, [AuthController, 'getUser'])
  router.post(contract.updateUser.path, [AuthController, 'updateUser'])
})
// .prefix('/auth')

router.get('/docs', async ({ view }) => {
  return view.render('docs', {
    url: app.inProduction ? 'https://melf.app/' : 'http://localhost:3333/',
  })
})
router.get('/openapi.json', async () => {
  return openApiDocument
})
