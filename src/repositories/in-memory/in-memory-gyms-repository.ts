import { Gym } from '@prisma/client'
import { GymRepository } from '../prisma/gym-repository'

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
