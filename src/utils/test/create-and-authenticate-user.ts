import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'Jhon Doe',
      email: 'jhon@gmail.com',
      password_hash: await hash('teste@test123', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })
  const authResponse = await request(app.server).post('/session').send({
    email: 'jhon@gmail.com',
    password: 'teste@test123',
  })

  const { token } = authResponse.body

  return { token }
}
