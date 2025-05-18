import { CheckIn } from '@prisma/client'
import { CheckinsRepository } from '@/repositories/prisma/check-ins-repository'
import { GymRepository } from '@/repositories/prisma/gym-repository'
import { ResourceNotFoundError } from '../erros/resource-not-found'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-two-cordinates'
import { MaxDistanceError } from '../erros/max-distances-error'
import { MaxNumberOfCheckinsError } from '../erros/max-number-of-checkins-error'

interface CheckInServiceRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLogitude: number
}

interface CheckInServiceResponse {
  checkIn: CheckIn
}

export class CheckInService {
  constructor(
    private usersRepository: CheckinsRepository,
    private gymsRepository: GymRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLogitude,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLogitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkOnSameDate = await this.usersRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )
    if (checkOnSameDate) {
      throw new MaxNumberOfCheckinsError()
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
