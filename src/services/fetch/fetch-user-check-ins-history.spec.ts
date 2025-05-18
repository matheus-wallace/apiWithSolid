import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryService } from './fetch-user-check-ins-history'

let checkinRepository: InMemoryCheckinRepository
let sut: FetchUserCheckInsHistoryService
describe('Fetch user Check-in history services', () => {
  beforeEach(async () => {
    checkinRepository = new InMemoryCheckinRepository()
    sut = new FetchUserCheckInsHistoryService(checkinRepository)
  })

  it('should be able to fetch check-ins history', async () => {
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

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-01',
      }),
      expect.objectContaining({
        gym_id: 'gym-02',
      }),
    ])
  })
  it('should be able to fetch paginated check-ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkinRepository.create({
        user_id: 'user-01',
        gym_id: `gym-${i}`,
        validated_at: null,
      })
    }
    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-21',
      }),
      expect.objectContaining({
        gym_id: 'gym-22',
      }),
    ])
  })
})
