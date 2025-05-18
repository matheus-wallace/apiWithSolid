import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'jhon@gmail.com',
    password: 'teste@test123',
  })
  const authResponse = await request(app.server).post('/session').send({
    email: 'jhon@gmail.com',
    password: 'teste@test123',
  })

  const { token } = authResponse.body

  return { token }
}
