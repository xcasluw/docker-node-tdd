const request = require('supertest')
const app = require('../../src/app')

const truncate = require('../utils/truncate')
const factory = require('../factories')

describe('User account creation', () => {
  beforeEach(async () => {
    jest.setTimeout(60000);
    await truncate()
  })

  it('should return 400 if name is not provided', async () => {
    const response = await request(app.express)
      .post('/users')
      .send({
        email: 'oligena@hotmail.com',
        password: '123456'
      })

    expect(response.status).toBe(400)
  })

  it('should return 400 if email is not provided', async () => {
    const response = await request(app.express)
      .post('/users')
      .send({
        name: 'Lucas Genari',
        password: '123456'
      })

    expect(response.status).toBe(400)
  })

  it('should return 400 if password is not provided', async () => {
    const response = await request(app.express)
      .post('/users')
      .send({
        name: 'Lucas Genari',
        email: 'oligena@hotmail.com'
      })

    expect(response.status).toBe(400)
  })
  

  it('should return 400 if user already exists', async () => {
    const user = await factory.create('User', {
      email: 'oligena@hotmail.com',
      name: 'Lucas Genari',
      password: '123456'
    })

    const response = await request(app.express)
      .post('/users')
      .send({
        email: user.email,
        name: user.name,
        password: '123456'
      })

    expect(response.status).toBe(400)
  })

  it('should return 200 if user was successfully created', async () => {
    const response = await request(app.express)
      .post('/users')
      .send({
        email: 'Lucas Genari',
        name: 'oligena@hotmail.com',
        password: '123456'
      })

    expect(response.status).toBe(200)
  })

  it('should return 400 if user was not created', async () => {
    const user = await factory.create('User', {
      email: 'oligena@hotmail.com',
      name: 'Lucas Genari',
      password: '123456'
    })

    const response = await request(app.express)
      .post('/users')
      .send({
        email: user.email,
        name: user.name,
        password: '123456'
      })

    expect(response.status).toBe(400)
  })

})
