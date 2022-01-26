import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './heroSlide.scss';
import Slider from "react-slick"
import apiConfig from '../../api/apiConfig';
import { Link, useNavigate } from 'react-router-dom';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import moviedbApi from '../../api/moviedbApi';
import { Modal } from "antd";


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
        console.log(res.data.results.slice(1, 2));
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
        console.log('video', res.data.results[0]);
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
      {
        // movie?.map((item, i) => <TrailerModal key={i} item={item} />)
      }
    </div>
  );
};

const HeroSlideItem = (props: any) => {

  let navigate = useNavigate();
  const item = props.item;
  const background = apiConfig.originalImage(item.backdrop_path ? item.poster_path : item.backdrop_path);
  const showVideo = () => {
    // const modal: Element | null = document.querySelector(`#modal_${item.id}`);
    // const videos = await moviedbApi.fetchVideo();

    // if (videos.results.length > 0) {
    //   const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
    //   modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
    // } else {
    //   modal.querySelector('.modal__content').innerHTML = 'No trailer';
    // }
    // modal?.classList.toggle('active');
    setIsModalVisible(true);


  }
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
            <button className="watch-now" onClick={() => navigate('/movie/' + item.id)}>
              Watch now
            </button>
            <button className="watch-trailer" onClick={showVideo}>
              Watch trailer
            </button>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
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

