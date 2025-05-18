import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymService } from './search-gym'

let gymsRepository: InMemoryGymRepository
let sut: SearchGymService
describe('Search gyms services', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository()
    sut = new SearchGymService(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'Academia do João',
      description: 'Gym 01',
      phone: '123456789',
      latitude: -23.5505,
      longitude: -46.6333,
    })
    await gymsRepository.create({
      title: 'Academia Typescript',
      description: 'Gym 01',
      phone: '123456789',
      latitude: -23.5505,
      longitude: -46.6333,
    })

    const { gyms } = await sut.execute({
      query: 'Typescript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Academia Typescript',
      }),
    ])
  })

  it('should be able to fetch paginated gym serach', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Academia Typescript ${i}`,
        description: 'Gym 01',
        phone: '123456789',
        latitude: -23.5505,
        longitude: -46.6333,
      })
    }
    const { gyms } = await sut.execute({
      query: 'Academia Typescript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Academia Typescript 21',
      }),
      expect.objectContaining({
        title: 'Academia Typescript 22',
      }),
    ])
  })
})
