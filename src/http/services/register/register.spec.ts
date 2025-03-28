import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterService } from './registerService'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../erros/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register services', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterService(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Matheus Pereira',
      email: 'teste1@gmail.com',
      password: 'teste',
    })

    const isPasswordCorrectlyHased = await compare('teste', user.password_hash)
    expect(isPasswordCorrectlyHased).toBe(true)
  })

  it('should not be able to register email twice', async () => {
    const email = 'teste@gmail.com'

    await sut.execute({
      name: 'Matheus Pereira',
      email,
      password: 'teste',
    })

    await expect(() =>
      sut.execute({
        name: 'Matheus Pereira',
        email,
        password: 'teste',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
  it('should be to register', async () => {
    const email = 'teste@gmail.com'

    const { user } = await sut.execute({
      name: 'Matheus Pereira',
      email,
      password: 'teste',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
