import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositories'
import { GetUserProfile } from '../profile/get-user-profile'

export function makeGetUserProfileService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const service = new GetUserProfile(prismaUsersRepository)

  return service
}
