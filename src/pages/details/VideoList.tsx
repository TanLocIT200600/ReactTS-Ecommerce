import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router';
import apiConfig from '../../api/apiConfig';



const VideoList = (props: any) => {

  const { id } = useParams();

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      const URL: string = `${apiConfig.baseUrl}movie/${id}/videos?api_key=${apiConfig.apiKey}`;
      try {
        const response = await axios.get(URL);
        setVideos(response.data.results.slice(0, 5));
        console.log('video', response.data);

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
        videos.map((item, i) => (
          <Video key={i} item={item} />
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
