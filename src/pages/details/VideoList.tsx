import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import movieDbApi from '../../api/movieDbApi';



const VideoList = (props: any) => {

  const { id } = useParams();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await movieDbApi.fetchVideo(id);
        setVideos(response.slice(0, 5));
      }
      catch (err) {
        console.log(err);
      }
    }
    getVideos();
  }, [props.id]);

  return (
    <>
      {
        videos.map((item, index) => (
          <Video key={index} item={item} />
        ))
      }
    </>
  );
}

const Video = (props: any) => {

  const item = props.item;

  const iframeRef: React.MutableRefObject<null> = useRef(null);

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        height="500"
        title="video"
      ></iframe>
    </div>
  )
}

export default VideoList;
