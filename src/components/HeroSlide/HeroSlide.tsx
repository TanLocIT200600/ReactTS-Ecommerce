import React, { useEffect, useRef, useState } from 'react';
import './heroSlide.scss';
import apiConfig from '../../api/apiConfig';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Modal } from 'antd';
import { useParams } from 'react-router-dom';
import movieDbApi from '../../api/movieDbApi';


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
    const fetchMovieList = async () => {
      try {
        const response = await movieDbApi.fetchMovieList();
        setMovie(response.slice(1, 2));
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchMovieList()
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
        }</Swiper>
    </div>
  );
};

const HeroSlideItem = (props: any) => {

  const item = props.item;
  const background = apiConfig.originalImage(item.backdrop_path ? item.poster_path : item.backdrop_path);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { id } = useParams();

  const [videos, setVideos] = useState();
  useEffect(() => {
    const fetchVideo = async (id: number) => {
      try {
        const res = await movieDbApi.fetchVideo(id);
        setVideos(res.slice(1, 2));
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchVideo(item.id);
  }, [id]);
  const iframeRef: React.MutableRefObject<null> = useRef(null);

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
            <button className="watch-trailer" onClick={showModal}>
              Watch trailer
            </button>
            <Modal title={item.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                ref={iframeRef}
                width="100%"
                height="350"
                title="video"
              ></iframe>
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

