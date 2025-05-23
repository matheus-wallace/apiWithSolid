import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyGymsParams {
  latitude: number
  longitude: number
}
export interface GymRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  FindManyNearbyGyms(params: FindManyNearbyGymsParams): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
