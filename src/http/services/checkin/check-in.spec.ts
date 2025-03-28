import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckinRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CehckInService } from './checkin'

let checkinRepository: InMemoryCheckinRepository
let sut: CehckInService
describe('Checkin services', () => {
  beforeEach(() => {
    checkinRepository = new InMemoryCheckinRepository()
    sut = new CehckInService(checkinRepository)
  })

  it('should be able to make a new check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'useid-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
