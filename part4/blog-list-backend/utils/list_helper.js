const _ = require('lodash')

const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  if(blogs.length === 0) return 0

  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) return {}

  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite}, blogs[0])
}

const mostBlogs = (blogs) => {
  const oBlogCountByAuthor = _.countBy(blogs, 'author')

  return _.transform(oBlogCountByAuthor, (result, value, key) => {
    if(value > result.blogs){
      result.author = key
      result.blogs = value
    }
  }, { author: '', blogs: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}