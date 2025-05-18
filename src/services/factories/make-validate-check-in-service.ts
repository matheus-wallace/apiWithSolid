import { ValidateCheckInService } from '../checkin/validate-check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeValidateCheckInService() {
  const checkinRepository = new PrismaCheckInsRepository()
  const service = new ValidateCheckInService(checkinRepository)

  return service
}
