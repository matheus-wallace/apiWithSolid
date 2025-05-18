import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (e2e) ', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('Should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'jhon@gmail.com',
      password: 'teste@test123',
    })
    const authResponse = await request(app.server).post('/session').send({
      email: 'jhon@gmail.com',
      password: 'teste@test123',
    })

    const { token } = authResponse.body
    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
    expect(profileResponse.statusCode).toBe(200)

    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'John Doe',
        email: 'jhon@gmail.com',
        created_at: expect.any(String),
      }),
    )
  })
})
