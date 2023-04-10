const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('POST /api/users: when there is initially one user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if username or password length is invalid', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUserInvalidUsername = {
      username: 'testuser',
      name: 'test',
      password: 'sa',
    }

    const newUserInvalidPassword = {
      username: 'testuser',
      name: 'test',
      password: 'sa',
    }

    const newUserUndefinedUsername = {
      name: 'test',
      password: 'sa',
    }

    const newUserUndefinedPassword = {
      username: 'testuser',
      name: 'test',
    }

    let result = await api
      .post('/api/users')
      .send(newUserInvalidUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('invalid username or password.')

    result = await api
      .post('/api/users')
      .send(newUserInvalidPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('invalid username or password.')

    result = await api
      .post('/api/users')
      .send(newUserUndefinedUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('invalid username or password.')

    result = await api
      .post('/api/users')
      .send(newUserUndefinedPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('invalid username or password.')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

describe('GET: /api/users: get all users', () => {
  beforeEach( async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(helper.initialUsers.length)
  })

  test('a specific user is within the returned users', async () => {
    const response = await api.get('/api/users')

    const username = response.body.map(r => r.username)
    expect(username).toContain(
      'hellas'
    )
  })

  test('the id property is existed', async () => {
    const response = await api.get('/api/users')

    expect(response.body[0].id).toBeDefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})