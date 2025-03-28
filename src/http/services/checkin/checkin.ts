import { CheckIn } from '@prisma/client'
import { CheckinsRepository } from '@/repositories/prisma/check-ins-repository'
import { GymRepository } from '@/repositories/prisma/gym-repository'
import { ResourceNotFoundError } from '../erros/resource-not-found'

interface CehckInServiceRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLogitude: number
}

interface CehckInServiceResponse {
  checkIn: CheckIn
}

export class CehckInService {
  constructor(
    private usersRepository: CheckinsRepository,
    private gymsRepository: GymRepository,
  ) {}

  async execute({
    userId,
    gymId,
  }: CehckInServiceRequest): Promise<CehckInServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const checkOnSameDate = await this.usersRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )
    if (checkOnSameDate) {
      throw new Error('You already checked in today.')
    }
    const checkIn = await this.usersRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
