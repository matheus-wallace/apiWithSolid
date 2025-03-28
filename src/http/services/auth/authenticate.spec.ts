import { beforeEach, describe, expect, it } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateService } from './authenticate'
import { InvalidCredentialsError } from '../erros/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService
describe('Authenticate services', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'matheus',
      email: 'teste@gmail.com',
      password_hash: await hash('teste', 6),
    })

    const { user } = await sut.execute({
      email: 'teste@gmail.com',
      password: 'teste',
    })

    const isPasswordCorrectlyHased = await compare('teste', user.password_hash)
    expect(isPasswordCorrectlyHased).toBe(true)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'testing@gmail.com',
        password: 'teste',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'matheus',
      email: 'teste@gmail.com',
      password_hash: await hash('teste', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'testing@gmail.com',
        password: 'testeeeeee',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
