import axios from 'axios'

export default {

  fetchMoviesByName (name) {
    return axios.get(process.env.SHOWS_SEARCH + name)
      .then((response) => {
        console.log(response.data)
        return response.data
      })
  },

  fetchMovieById (id) {
    return axios.get(process.env.SHOWS_LOOKUP + '/' + id)
      .then((response) => {
        console.log(response.data)
        return response.data
      })
  },

  fetchAllShows () {
    return axios.get(process.env.SHOWS_LOOKUP)
      .then((response) => {
        console.log(response.data)
        return response.data
      })
  },

  fetchAllShowsByPage (page) {
    return axios.get(process.env.SHOWS_LOOKUP + '?page=' + page)
      .then((response) => {
        console.log(response.data)
        return response.data
      })
  },

  fetchShowCast (id) {
    return axios.get(process.env.SHOWS_LOOKUP + '/' + id + process.env.SHOW_CAST)
      .then((response) => {
        console.log(response.data)
        return response.data
      })
  }
}
