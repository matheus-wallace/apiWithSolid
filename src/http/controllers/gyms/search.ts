import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymService } from '@/services/factories/make-search-gym-service'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymQueryParamsSchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { query, page } = searchGymQueryParamsSchema.parse(request.body)

  const searchGymService = makeSearchGymService()
  const { gyms } = await searchGymService.execute({
    query,
    page,
  })

  reply.status(201).send({ gyms })
}
