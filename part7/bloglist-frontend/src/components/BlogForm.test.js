import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('updates parent state and calls onSubmit', async () => {
    const handleSubmit = jest.fn(event => event.preventDefault())

    const container = render(<BlogForm handleSubmit={ handleSubmit }/>).container

    const titleIuput = container.querySelector('#title-input')

    const sendButton = screen.getByText('submit')

    await userEvent.type(titleIuput, 'test title')
    await userEvent.click(sendButton)

    expect(handleSubmit.mock.calls).toHaveLength(1)
  })
})