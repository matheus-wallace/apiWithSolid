import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.status(401).send({ message: 'Unauthorized' })
  }
}

// export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
//   try {
//     await request.jwtVerify()
//   } catch (err) {
//     return reply.status(401).send({ message: 'Unauthorized.' })
//   }
// }
