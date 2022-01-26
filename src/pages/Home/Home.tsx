import React from 'react';
import HeroSlide from '../../components/HeroSlide/HeroSlide';
import MoviePopular from '../../components/MoviePopular/MoviePopular';
import MovieTopRated from '../../components/MovieTopRated/MovieTopRated';
import MovieUpcoming from '../../components/MovieUpcoming/MovieUpcoming';
import Details from '../details/Details';

const Home = () => {
  return <>
    <HeroSlide />
    <MovieTopRated />
    <MoviePopular />
    <MovieUpcoming />
    <Details />
  </>;
};

export default Home;
