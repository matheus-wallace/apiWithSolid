import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymService } from './create-gym'

let gymsRepository: InMemoryGymRepository
let sut: CreateGymService

describe('Create gym  services', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym 01',
      description: 'Gym 01',
      phone: '123456789',
      latitude: -23.5505,
      longitude: -46.6333,
    })
    expect(gym.id).toBe(expect.any(String))
  })
})
