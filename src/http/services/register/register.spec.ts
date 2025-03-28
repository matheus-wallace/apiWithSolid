import { describe, expect, it } from 'vitest'
import { RegisterService } from './registerService'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../erros/user-already-exists-error'

describe('Register services', () => {
  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      name: 'Matheus Pereira',
      email: 'teste1@gmail.com',
      password: 'teste',
    })

    const isPasswordCorrectlyHased = await compare('teste', user.password_hash)
    expect(isPasswordCorrectlyHased).toBe(true)
  })

  it('should not be able to register email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)
    const email = 'teste@gmail.com'

    await registerService.execute({
      name: 'Matheus Pereira',
      email,
      password: 'teste',
    })

    await expect(() =>
      registerService.execute({
        name: 'Matheus Pereira',
        email,
        password: 'teste',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
  it('should be to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)
    const email = 'teste@gmail.com'

    const { user } = await registerService.execute({
      name: 'Matheus Pereira',
      email,
      password: 'teste',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
