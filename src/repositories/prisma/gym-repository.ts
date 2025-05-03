import { Gym, Prisma } from '@prisma/client'

export interface GymRepository {
  findById(id: string): Promise<Gym | null>
  searchManyByTitle(query: string, page: number): Promise<Gym[]>
  // searchManyByDescription(query: string, page: number): Promise<Gym[]>
  // searchManyByLocation(
  //   latitude: number,
  //   longitude: number,
  //   page: number,
  // ): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
