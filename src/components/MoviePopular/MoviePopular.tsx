import React, { useEffect, useState } from 'react';
import axios from "axios";
import './movie-popular.scss'
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

interface IMyData {
  page: number;
  id: number,
  title: string,
  backdrop_path: string,
  poster_path: string,
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

const MoviePopular = (props: any) => {

  const [moviePopular, setMoviePopular] = useState<IMyData[]>();


  useEffect(() => {
    const fetchMoviePopular: any = async () => {
      const URL: string = "https://api.themoviedb.org/3/movie/popular?api_key=761dea999bb72d9517bae0bb585b4df0";
      try {
        const response = await axios.get(URL);
        // console.log('moviePP', response.data.results);
        setMoviePopular(response.data.results);
      }
      catch (err) {
        console.log(err);

      }
    }
    fetchMoviePopular()
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return <div className="trending-movie">
    <h2 className="trending-movie__title">Trending Movie</h2>
    <Slider {...settings}>
      {moviePopular?.map((item: any) => (
        <Link to={`/movie/${item.id}`} key={item.id} className="slider-item">
          <div className="slider-item__images">
            <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt="" />
          </div>
          <div className="slider-item__content">
            <h3>{item.title}</h3>
          </div>
          <span className="slider-item__rating">{item.vote_average}</span>
        </Link>
      ))}
    </Slider>
  </div>;
};

export default MoviePopular;
