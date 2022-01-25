import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface IMyData {
  page: number;
  id: number,
  title: string,
  results: [
    adult: boolean,
    backdrop_path: string,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
  ]
}

const HeroSlide = () => {
  const [movie, setMovie] = useState<IMyData[]>();

  useEffect(() => {
    const fetchMovieList: any = async () => {
      const URL: string = "https://api.themoviedb.org/3/movie/popular?api_key=761dea999bb72d9517bae0bb585b4df0"
      try {
        const res = await axios.get(URL);
        console.log(res.data.results.slice(1, 4));
        setMovie(res.data.results.slice(1, 4));
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchMovieList()
  }, [])


  return (
    <ul>
      {movie?.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
};

export default HeroSlide;

