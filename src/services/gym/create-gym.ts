import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/prisma/gym-repository'

interface CreateGymServiceParams {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymServiceResponse {
  gym: Gym
}

export class CreateGymService {
  constructor(private gymsRepository: GymRepository) {}
  async execute({
    title,
    description,
    latitude,
    longitude,
  }: CreateGymServiceParams): Promise<CreateGymServiceResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      latitude,
      longitude,
    })
    return {
      gym,
    }
  }
}
