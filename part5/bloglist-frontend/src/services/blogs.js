import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject, token) => {
  const response = await axios.post(baseUrl, newObject, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return response.data
}

const update = async (updatedBlog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

const remove = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, remove }