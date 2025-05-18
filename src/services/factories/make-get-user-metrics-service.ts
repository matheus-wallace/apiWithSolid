import { GetUserMetricsService } from '../metrics/get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetrics() {
  const checkinRepository = new PrismaCheckInsRepository()
  const service = new GetUserMetricsService(checkinRepository)

  return service
}
