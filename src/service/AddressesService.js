import axios from 'axios'

const route = 'http://localhost:8088/api/addresses'

export default {
  getAll() {
    return axios.get(`${route}`)
  },

  create(form) {
    return axios.post(`${route}/store`, form)
  },

  update(form) {
    return axios.put(`${route}/update`, form)
  },

  getAddressByZipcode(zipcode) {
    return axios.get(`${route}/find/zipcode`, {params: {'zipcode':zipcode}})
  },

  getAddressByFuzzy(word) {
    return axios.get(`${route}/search`, {params: {'word':word}})
  }
}
