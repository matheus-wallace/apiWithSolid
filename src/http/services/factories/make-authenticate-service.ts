import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositories'
import { AuthenticateService } from '../auth/authenticate'

export function makeAuthenticateService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(prismaUsersRepository)

  return authenticateService
}
