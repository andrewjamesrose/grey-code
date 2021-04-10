import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

//here we export an "object literal"
// it's possible to use a shorthand {getAll, create, update} here as the names of the functions are
// the same as their names in the object being exported
export default { 
  getAll: getAll, 
  create: create, 
  update: update 
}