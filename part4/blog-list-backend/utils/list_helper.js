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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}