import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUserProfile } from './get-user-profile'
import { ResourceNotFoundError } from '../erros/resource-not-found'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfile
describe('Get user profile services', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfile(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'matheus',
      email: 'teste@gmail.com',
      password_hash: await hash('teste', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toBe('matheus')
    expect(user.email).toBe('teste@gmail.com')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'testeInvalidid',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
