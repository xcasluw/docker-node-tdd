const request = require('supertest')
const app = require('../../src/app')

const truncate = require('../utils/truncate')
const factory = require('../factories')

describe('Authentication', () => {
  beforeEach(async () => {
    jest.setTimeout(60000);
    await truncate()
  })

  it('should return 401 if email is invalid', async () => {
    const response = await request(app.express)
      .post('/sessions')
      .send({
        email: 'xyz@email.com',
        password: '123456'
      })

    expect(response.status).toBe(401)
  })

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const response = await request(app.express)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.status).toBe(200)
  })

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User')

    const response = await request(app.express)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.status).toBe(401)
  })

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const response = await request(app.express)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.body).toHaveProperty('token')
  })

  it('should access private routes when authenticated', async () => {
    const user = await factory.create('User')

    const response = await request(app.express)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`)

    expect(response.status).toBe(200)
  })

  it('should not access private routes without jwt token', async () => {
    const response = await request(app.express).get('/dashboard')

    expect(response.status).toBe(401)
  })

  it('should not access private routes with invalid jwt token', async () => {
    const response = await request(app.express)
      .get('/dashboard')
      .set('Authorization', `Bearer 312546132546`)

    expect(response.status).toBe(401)
  })
})
