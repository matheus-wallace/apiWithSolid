import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Refresh token (e2e) ', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  test('Should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'jhon@gmail.com',
      password: 'teste@test123',
    })
    const authResponse = await request(app.server).post('/session').send({
      email: 'jhon@gmail.com',
      password: 'teste@test123',
    })

    const cookies = authResponse.get('Set-Cookie') ?? []

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
