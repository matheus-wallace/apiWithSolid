import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '@/http/middleware/verify-jwt'
import { refresh } from './refersh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/session', authenticate)
  app.patch('/token/refresh', refresh)
  // Authenticated routes
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
