import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CehckInService } from './checkin'

let checkinRepository: InMemoryCheckinRepository
let sut: CehckInService
describe('Checkin services', () => {
  beforeEach(() => {
    checkinRepository = new InMemoryCheckinRepository()
    sut = new CehckInService(checkinRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to make a new check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'useid-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should note be able to check in twice in in same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'useid-01',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'useid-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  it('should note be able to check in twice but in diferrent days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'useid-01',
    })

    vi.setSystemTime(new Date(2022, 0, 22, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'useid-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
