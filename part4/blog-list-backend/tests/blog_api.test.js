const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let authHeader

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})
  // create a test user and save the corresponding auth header
  const user = helper.initialUsers[0]
  await api.post('/api/users').send(user)
  const response = await api.post('/api/login').send(user)
  authHeader = `Bearer ${response.body.token}`
})

describe('GET /api/blogs: get all blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const title = response.body.map(r => r.title)
    expect(title).toContain(
      'Go To Statement Considered Harmful'
    )
  })

  test('the id property is existed', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST /api/blogs: add new blogs', () => {

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const title = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(title).toContain(
      newBlog.title
    )
  })

  test('new added blog has 0 likes if likes property is missing', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const result = response.body[response.body.length - 1].likes
    expect(result).toBe(0)
  })

  test('adding a blog failed if token is not provided', async () => {
    const blogsBefore = await helper.blogsInDb()

    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(blogsBefore.length)
  })

  test('expect return bad request if title is missing', async () => {
    const newBlog = {
      author: 'author1',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('expect return bad request if author is missing', async () => {
    const newBlog = {
      title: 'title1',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('DELETE /api/blogs: deletion of a blog', () => {
  let id
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', authHeader)
      .send(blog)

    id = response.body.id
  })

  test('can be deleted by the creator', async () => {
    const blogsBefore = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', authHeader)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsBefore).toHaveLength(1)
    expect(blogsAtEnd).toHaveLength(0)
  })

  test('can not be deleted without valid auth header', async () => {
    await api
      .delete(`/api/blogs/${id}`)
      .expect(401)

    const blogsAfter = await helper.blogsInDb()

    expect(blogsAfter).toHaveLength(1)
  })
})

describe('PUT /api/blogs: update of a blog', () => {
  let blogToUpdate
  beforeEach(async () => {
    blogToUpdate = new Blog({
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://testblog.com',
      likes: 0
    })
    await blogToUpdate.save()
  })

  afterEach(async () => {
    await Blog.deleteMany({})
  })

  test('updates a blog with valid id and data', async () => {
    const updatedData = {
      title: 'Updated Blog',
      author: 'Updated Author',
      url: 'http://updatedblog.com',
      likes: 5
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toMatchObject(updatedData)

    const updatedBlog = await Blog.findById(blogToUpdate.id)
    expect(updatedBlog.toJSON()).toMatchObject(updatedData)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})