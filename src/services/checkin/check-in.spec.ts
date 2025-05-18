import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInService } from './checkin'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from '../erros/max-distances-error'
import { MaxNumberOfCheckinsError } from '../erros/max-number-of-checkins-error'

let checkinRepository: InMemoryCheckinRepository
let sut: CheckInService
let gymRepository: InMemoryGymRepository
describe('Checkin services', () => {
  beforeEach(async () => {
    checkinRepository = new InMemoryCheckinRepository()
    gymRepository = new InMemoryGymRepository()
    sut = new CheckInService(checkinRepository, gymRepository)
    vi.useFakeTimers()

    await gymRepository.create({
      id: 'gym-01',
      title: 'Gym 01',
      description: 'Gym 01',
      phone: '123456789',
      latitude: -23.5505,
      longitude: -46.6333,
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
      userLongitude: -46.6333,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should note be able to check in twice in in same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'useid-01',
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'useid-01',
        userLatitude: -23.5505,
        userLongitude: -46.6333,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckinsError)
  })

  it('should note be able to check in twice but in diferrent days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'useid-01',
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    })

    vi.setSystemTime(new Date(2022, 0, 22, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'useid-01',
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in on distant gym', async () => {
    gymRepository.items.push({
      id: 'gym-02',
      title: 'Gym 02',
      description: 'Gym 02',
      phone: '123456789',
      latitude: new Decimal(-22.9509859),
      longitude: new Decimal(-46.67708115),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'useid-01',
        userLatitude: -23.5505,
        userLongitude: -46.6333,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
