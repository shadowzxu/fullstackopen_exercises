import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let mockBlogService = {
    update: jest.fn()
  }
  let mockHandleRemoveBtnClick = jest.fn()
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

  test('render the blog\'s title and author', () => {
    render(<Blog
      blog={ blog }
      handleRemoveBtnClick={mockHandleRemoveBtnClick}
      blogService={ mockBlogService }/>
    )

    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()
  })

  test('hide blog details by default', () => {
    const component = render(<Blog
      blog={ blog }
      handleRemoveBtnClick={mockHandleRemoveBtnClick}
      blogService={ mockBlogService }/>
    )

    const div = component.container.querySelector('.blogDetail')
    expect(div).toHaveStyle('display: none')
  })
})

