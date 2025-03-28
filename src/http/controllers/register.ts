import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterService } from '../services/register/registerService'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositories'
import { UserAlreadyExistsError } from '../services/erros/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const resgisterBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = resgisterBodySchema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(prismaUsersRepository)
    await registerService.execute({
      name,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }

  reply.status(201).send({ name, email })
}
