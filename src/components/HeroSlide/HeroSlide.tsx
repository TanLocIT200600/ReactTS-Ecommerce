import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import SwiperCore, { Autoplay } from "swiper";
import './heroSlide.scss';
import Slider from "react-slick"


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

const HeroSlide = () => {

  SwiperCore.use([Autoplay]);

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };


  return (
    <div className="hero-slide">
      <Slider {...settings}>
        {
          movie?.map((item) => (
            <img key={item.id} src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt='' width="1000" height="800" />
          ))
        }
      </Slider>
    </div>
  );
};


export default HeroSlide;

