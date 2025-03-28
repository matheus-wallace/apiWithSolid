import { CheckIn, Prisma } from '@prisma/client'

export interface CheckinsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
