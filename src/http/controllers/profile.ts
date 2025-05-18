import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserProfileService } from '../../services/factories/make-get-user-profile-service'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileService()
  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  })
  if (!user) {
    return reply.status(404).send({ message: 'User not found' })
  }
  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  })
}
