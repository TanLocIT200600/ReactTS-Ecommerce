const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '761dea999bb72d9517bae0bb585b4df0',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;