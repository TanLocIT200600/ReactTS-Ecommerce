const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '761dea999bb72d9517bae0bb585b4df0',
  originalImage: (imgPath: any) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  w500Image: (imgPath: any) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}
export default apiConfig;