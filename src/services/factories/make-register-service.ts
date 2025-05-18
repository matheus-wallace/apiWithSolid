import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repositories'
import { RegisterService } from '../register/registerService'

export function makeRegisterService() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerService = new RegisterService(prismaUsersRepository)
  return registerService
}
