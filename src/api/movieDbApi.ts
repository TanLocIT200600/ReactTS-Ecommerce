import axios from 'axios';
import apiConfig from './apiConfig';

const movieDbApi = {
  fetchMovieList: () => {
    const response = axios.get(`${apiConfig.baseUrl}movie/popular?api_key=${apiConfig.apiKey}`)
      .then((res) => {
        return res.data.results;
      })
      .catch((err) => console.log(err)
      )
    return response;
  },
  fetchVideo: (id: number) => {
    const response = axios.get(`${apiConfig.baseUrl}movie/${id}/videos?api_key=${apiConfig.apiKey}`)
      .then((res) => {
        return res.data.results;
      })
      .catch((err) => console.log(err)
      )
    return response;
  },
  fetchDetail: (id: string | undefined) => {
    const response = axios.get(`${apiConfig.baseUrl}movie/${id}?api_key=${apiConfig.apiKey}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.log(err)
      )
    return response;
  },
  fetchMoviePopular: () => {
    const response = axios.get(`${apiConfig.baseUrl}movie/popular?api_key=${apiConfig.apiKey}`)
      .then((res) => {
        return res.data.results;
      })
      .catch((err) => console.log(err)
      )
    return response;
  },
  fetchMovieTopRated: () => {
    const response = axios.get(`${apiConfig.baseUrl}movie/top_rated?api_key=${apiConfig.apiKey}`)
      .then((res) => {
        return res.data.results;
      })
      .catch((err) => console.log(err)
      )
    return response;
  },
  fetchMovieUpcoming: () => {
    const response = axios.get(`${apiConfig.baseUrl}movie/upcoming?api_key=${apiConfig.apiKey}`)
      .then((res) => {
        return res.data.results;
      })
      .catch((err) => console.log(err)
      )
    return response;
  },
}
export default movieDbApi;