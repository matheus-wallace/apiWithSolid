import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsService } from './fetch-nearby-gym'

let gymsRepository: InMemoryGymRepository
let sut: FetchNearbyGymsService
describe('Fetch nearby gyms services', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new FetchNearbyGymsService(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near gym',
      description: 'Gym 01',
      phone: '123456789',
      latitude: -23.5505,
      longitude: -46.6333,
    })
    await gymsRepository.create({
      title: 'Far Gym',
      description: 'Gym 01',
      phone: '123456789',
      latitude: -23.2865207,
      longitude: -46.8033412,
    })

    const { gyms } = await sut.execute({
      userLatitude: -23.5505,
      userLongitude: -46.6333,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near gym',
      }),
    ])
  })
})
