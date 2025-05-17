import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gym-repository'
import { CheckInService } from '../checkin/checkin'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeCheckinService() {
  const checkinRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const service = new CheckInService(checkinRepository, gymsRepository)

  return service
}
