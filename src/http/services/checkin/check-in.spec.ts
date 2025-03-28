import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CehckInService } from './checkin'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkinRepository: InMemoryCheckinRepository
let sut: CehckInService
let gymRepository: InMemoryGymRepository
describe('Checkin services', () => {
  beforeEach(() => {
    checkinRepository = new InMemoryCheckinRepository()
    gymRepository = new InMemoryGymRepository()
    sut = new CehckInService(checkinRepository, gymRepository)
    vi.useFakeTimers()
    gymRepository.items.push({
      id: 'gym-01',
      title: 'Gym 01',
      description: 'Gym 01',
      phone: '123456789',
      latitude: new Decimal(-23.5505),
      longitude: new Decimal(-46.6333),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to make a new check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'useid-01',
      userLatitude: -23.5505,
      userLogitude: -46.6333,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should note be able to check in twice in in same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'useid-01',
      userLatitude: -23.5505,
      userLogitude: -46.6333,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'useid-01',
        userLatitude: -23.5505,
        userLogitude: -46.6333,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
  it('should note be able to check in twice but in diferrent days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'useid-01',
      userLatitude: -23.5505,
      userLogitude: -46.6333,
    })

    vi.setSystemTime(new Date(2022, 0, 22, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'useid-01',
      userLatitude: -23.5505,
      userLogitude: -46.6333,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
