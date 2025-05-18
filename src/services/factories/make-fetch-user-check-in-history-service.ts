import { FetchUserCheckInsHistoryService } from '../fetch/fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheInsHistoryService() {
  const checkinRepository = new PrismaCheckInsRepository()
  const service = new FetchUserCheckInsHistoryService(checkinRepository)

  return service
}
