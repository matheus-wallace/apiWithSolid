import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheInsHistoryService } from '@/services/factories/make-fetch-user-check-in-history-service'

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(request.query)

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheInsHistoryService()

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkIns,
  })
}
