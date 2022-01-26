import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiConfig from '../../api/apiConfig';
import moviedbApi from '../../api/moviedbApi';
import VideoList from './VideoList';
import '../details/detail.scss';


interface IDataDetail {
  backdrop_path: string;
  poster_path: string;
  title: string;
  name: string;
  genres: [];
  overview: string;
  id: number;
}

const Details = () => {

  const { id } = useParams();

  const [item, setItem] = useState<IDataDetail>();

  useEffect(() => {
    const getDetail = async () => {
      const response: any = await moviedbApi.getDetail(id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    }
    getDetail();
  }, [id]);

  return (
    <>
      {
        item && (
          <>
            <div className="banner" style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }}></div>
            <div className="mb-3 movie-content container">
              <div className="movie-content__poster">
                <div className="movie-content__poster__img" style={{ backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})` }}></div>
              </div>
              <div className="movie-content__info">
                <h1 className="title">
                  {item.title || item.name}
                </h1>
                {/* <div className="genres">
                  {
                    item.genres && item.genres.slice(0, 5).map((genre, i) => (
                      <span key={i} className="genres__item">{genre.name}</span>
                    ))
                  }
                </div> */}
                <p className="overview">{item.overview}</p>
              </div>
            </div>
            <div className="container">
              <div className="section mb-3">
                <VideoList id={item.id} />
              </div>
            </div>
          </>
        )
      }
    </>
  );
}

export default Details;
