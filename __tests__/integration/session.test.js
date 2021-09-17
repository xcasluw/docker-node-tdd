const request = require('supertest')
const app = require('../../src/app')

const truncate = require('../utils/truncate')
const factory = require('../factories')

describe('Authentication', () => {
  beforeEach(async () => {
    jest.setTimeout(60000);
    await truncate()
  })

  it('should return 400 if email is not provided', async () => {
    const response = await request(app.express)
      .post('/sessions')
      .send({
        password: '123456'
      })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'email is required' })
  })

  it('should return 400 if password is not provided', async () => {
    const response = await request(app.express)
      .post('/sessions')
      .send({
        email: 'xyz@email.com',
      })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'password is required' })
  })

  it('should return 401 if user is invalid', async () => {
    const response = await request(app.express)
      .post('/sessions')
      .send({
        email: 'xyz@email.com',
        password: '123456'
      })

    expect(response.status).toBe(401)
    expect(response.body).toEqual({ error: 'User not found' })
  })

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456'
    })

    const mockUser = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    const response = await request(app.express)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456'
      })
    expect(response.status).toBe(200)
    expect(response.body.user).toEqual(mockUser)
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
    expect(response.body).toEqual({ error: 'Wrong password' })
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
    expect(response.body).toEqual({ msg: 'Dashboard is ok' })
  })

  it('should not access private routes without jwt token', async () => {
    const response = await request(app.express).get('/dashboard')
    
    expect(response.status).toBe(401)
    expect(response.body).toEqual({ error: 'Token not provided' })
  })

  it('should not access private routes with invalid jwt token', async () => {
    const response = await request(app.express)
      .get('/dashboard')
      .set('Authorization', `Bearer 312546132546`)

    expect(response.status).toBe(401)
    expect(response.body).toEqual({ error: 'jwt malformed' })
  })
})
