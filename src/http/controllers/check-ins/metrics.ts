import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserMetrics } from '@/services/factories/make-get-user-metrics-service'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getUserMetricsUseCase = makeGetUserMetrics()

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({
    checkInsCount,
  })
}
