import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let container
  let mockBlogService = {
    update: (updatedBLog) => {
      return updatedBLog
    }
  }
  const blog = {
    id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
    likes: 11,
    user: {
      name: 'User'
    }
  }
  let remove = jest.fn()

  beforeEach(() => {
    container = render(<Blog
      blog={ blog }
      remove={remove}
      blogService={ mockBlogService }
      isCreator={true}/>
    ).container
  })

  test('render the blog\'s title and author', () => {
    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()
  })

  test('hide blog details by default', () => {
    const div = container.querySelector('.blogDetail')
    expect(div).toHaveStyle('display: none')
  })

  test('show blog details after clicking the button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blogDetail')
    expect(button).toHaveTextContent('hide')
    expect(div).not.toHaveStyle('display: none')
  })

  test('after clicking like button twice, number of likes add by 2',  async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    const likesAfterBtnClickedTwice = blog.likes + 2
    await user.click(button)
    await user.click(button)

    const p = container.querySelector('.likes')
    expect(p).toHaveTextContent(`Likes: ${likesAfterBtnClickedTwice}`)
  })

  test('after clicking remove button, callback has correct data', async () => {
    const windowConfirmSpy = jest.spyOn(window, 'confirm')
    windowConfirmSpy.mockImplementation(() => true)

    const user =userEvent.setup()
    const button = screen.getByText('remove')
    await user.click(button)

    expect(windowConfirmSpy).toHaveBeenCalledWith(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    expect(remove).toHaveBeenCalledTimes(1)
    expect(remove).toHaveBeenCalledWith(blog)
  })
})

