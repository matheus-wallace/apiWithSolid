import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/prisma/gym-repository'

interface FetchNearbyGymsServiceParams {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsServiceResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsService {
  constructor(private gymsRepository: GymRepository) {}
  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsServiceParams): Promise<FetchNearbyGymsServiceResponse> {
    const gyms = await this.gymsRepository.FindManyNearbyGyms({
      latitude: userLatitude,
      longitude: userLongitude,
    })
    if (!gyms) {
      throw new Error('No gyms found')
    } else if (gyms.length === 0) {
      throw new Error('No gyms found')
    } else if (gyms.length > 20) {
      throw new Error('Too many gyms found')
    } else if (gyms.length < 1) {
      throw new Error('No gyms found')
    }
    return {
      gyms,
    }
  }
}
