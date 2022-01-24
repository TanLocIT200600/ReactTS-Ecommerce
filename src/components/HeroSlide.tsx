import React, { useEffect, useState } from 'react';
import moviedbApi, { movieType } from '../api/moviedbApi';

interface MovieList {
  page: number
  results: []
  total_pages: number
  total_results: number
}

const createData = () => {

}

const HeroSlide = () => {

  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await moviedbApi.fetchMoviesList();
        // console.log(response);
      } catch {
        console.log('error');
      }
    }
    fetchData();
  }, [])

  return (
    <div>

    </div>
  );
};

export default HeroSlide;
