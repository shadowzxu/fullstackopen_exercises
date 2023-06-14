const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name:1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes || 0,
    url: body.url,
    comments: []
  })

  const user = request.user
  if(!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  blog.user = user._id

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comment', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const body = request.body

  blog.comments.push({ body: body.body, date: Date.now() })
  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const user = request.user

  if(!user || blog.user.toString() !== user.id.toString()){
    return response.status(401).json({ error: 'operation not permitted' })
  }

  await user.save()
  await blog.remove()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name:1 })
  response.json(updatedBlog)
})

module.exports = blogsRouter