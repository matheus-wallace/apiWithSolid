import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchNearbyGymsService } from '@/services/factories/make-fetch-nearby-gyms-service'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsquerySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude } = nearbyGymsquerySchema.parse(request.query)

  const nearbyGymService = makeFetchNearbyGymsService()
  const { gyms } = await nearbyGymService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  reply.status(200).send({ gyms })
}
