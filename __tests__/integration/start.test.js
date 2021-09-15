const request = require('supertest')
const app = require('../../src/app')

describe('API Status', () => {
  it('should return 200 if API is running', async () => {
    const response = await request(app.express)
      .get('/').send()

    expect(response.status).toBe(200)
  })
})
