import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gym-repository'
import { SearchGymService } from '../gym/search-gym'

export function makeSearchGymService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new SearchGymService(gymsRepository)

  return service
}
