import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsService } from './get-user-metrics'

let checkinRepository: InMemoryCheckinRepository
let sut: GetUserMetricsService
describe('Get user metrics services', () => {
  beforeEach(async () => {
    checkinRepository = new InMemoryCheckinRepository()
    sut = new GetUserMetricsService(checkinRepository)
  })

  it('should be able to fetch check-ins count from metrics', async () => {
    await checkinRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
      validated_at: null,
    })
    await checkinRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
      validated_at: null,
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).equal(2)
  })
})
