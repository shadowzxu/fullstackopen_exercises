const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title, author, url }) => {
  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            value={title}
            onChange={ handleTitleChange }
            id='title-input'
          />
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={ handleAuthorChange }
            id='author-input'
          />
        </div>
        <div>
          url:
          <input
            value={url}
            onChange={ handleUrlChange }
            id='url-input'
          />
        </div>
        <button type='submit'>submit</button>
      </form>
    </div>
  )
}

export default BlogForm