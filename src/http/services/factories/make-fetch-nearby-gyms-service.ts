import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gym-repository'
import { FetchNearbyGymsService } from '../gym/fetch-nearby-gym'

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PrismaGymsRepository()
  const service = new FetchNearbyGymsService(gymsRepository)

  return service
}
