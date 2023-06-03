import { useState } from 'react'

const BlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    onCreate({ title, author, url, likes: 0 })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title-input"
          />
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author-input"
          />
        </div>
        <div>
          url:
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url-input"
          />
        </div>
        <button type="submit" id="submit-button">
          submit
        </button>
      </form>
    </div>
  )
}

export default BlogForm
