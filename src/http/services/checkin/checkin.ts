import { CheckIn } from '@prisma/client'
import { CheckinsRepository } from '@/repositories/prisma/check-ins-repository'

interface CehckInServiceRequest {
  userId: string
  gymId: string
}

interface CehckInServiceResponse {
  checkIn: CheckIn
}

export class CehckInService {
  constructor(private usersRepository: CheckinsRepository) {}

  async execute({
    userId,
    gymId,
  }: CehckInServiceRequest): Promise<CehckInServiceResponse> {
    const checkIn = await this.usersRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
