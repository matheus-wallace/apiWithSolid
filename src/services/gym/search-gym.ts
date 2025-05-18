import { Gym } from '@prisma/client'
import { GymRepository } from '@/repositories/prisma/gym-repository'

interface SearchGymServiceParams {
  query: string
  page: number
}

interface SearchGymServiceResponse {
  gyms: Gym[]
}

export class SearchGymService {
  constructor(private gymsRepository: GymRepository) {}
  async execute({
    query,
    page,
  }: SearchGymServiceParams): Promise<SearchGymServiceResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)
    return {
      gyms,
    }
  }
}
