import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('when blog is created, callback has correct data', async () => {
    const onCreate = jest.fn()
    const container = render(<BlogForm onCreate={onCreate} />).container

    const blogToCreate = {
      author: 'Kalle Ilves',
      title: 'Testing is pretty easy',
      url: 'https://testing-library.com/docs/react-testing-library/intro/',
      likes: 0,
    }

    const createButton = screen.getByText('submit')

    const titleInput = container.querySelector('#title-input')
    await userEvent.type(titleInput, blogToCreate.title)

    const authorInput = container.querySelector('#author-input')
    await userEvent.type(authorInput, blogToCreate.author)

    const urlInput = container.querySelector('#url-input')
    await userEvent.type(urlInput, blogToCreate.url)

    await userEvent.click(createButton)

    expect(onCreate.mock.calls[0][0]).toEqual(blogToCreate)
  })
})
