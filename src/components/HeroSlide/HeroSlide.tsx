import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './heroSlide.scss';
import apiConfig from '../../api/apiConfig';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


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
  const [video, setVideo] = useState();

  useEffect(() => {
    const fetchMovieList: any = async () => {
      const URL: string = "https://api.themoviedb.org/3/movie/popular?api_key=761dea999bb72d9517bae0bb585b4df0"
      try {
        const res = await axios.get(URL);
        // console.log(res.data.results.slice(1, 2));
        setMovie(res.data.results.slice(1, 2));
      }
      catch (err) {
        console.log(err);
      }
    };
    const fetchVideo: any = async () => {
      const URL: string = "https://api.themoviedb.org/3/movie/585083/videos?api_key=761dea999bb72d9517bae0bb585b4df0"
      try {
        const res = await axios.get(URL);
        // console.log('video', res.data.results[0]);
        setVideo(res.data.results[0]);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchMovieList()
    fetchVideo()
  }, [])

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {
          movie?.map((item, i) => (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
              )}
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
};

const HeroSlideItem = (props: any) => {

  const item = props.item;
  const background = apiConfig.originalImage(item.backdrop_path ? item.poster_path : item.backdrop_path);

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title}</h2>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <button className="watch-now">Watch now</button>
            <button className="watch-trailer">
              Watch trailer
            </button>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={apiConfig.w500Image(item.poster_path)} alt="" />
        </div>
      </div>
    </div>
  )
}


export default HeroSlide;

