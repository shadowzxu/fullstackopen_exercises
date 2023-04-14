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
            onChange={ handleTitleChange }>
            </input>
            </div>
            <div>
            author:
                <input
                value={author}
                onChange={ handleAuthorChange }>
                </input>
            </div>
            <div>
            url:      
                <input
                value={url}
                onChange={ handleUrlChange }>
                </input>
            </div>
            <button type='submit'>submit</button>
        </form>
      </div>
  )
}

export default BlogForm