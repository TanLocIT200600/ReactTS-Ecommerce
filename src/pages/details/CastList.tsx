import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import apiConfig from '../../api/apiConfig';

interface ICast {
  profile_path: string;
  name: string;
}

const CastList = (props: any) => {

  const { id } = useParams();

  const [casts, setCasts] = useState<ICast[]>([]);

  useEffect(() => {
    const getCredits = async () => {
      const URL: string = `${apiConfig.baseUrl}movie/${id}/credits?api_key=${apiConfig.apiKey}`;
      try {
        const res = await axios.get(URL);
        setCasts(res.data.cast.slice(0, 8));
      }
      catch (err) {
        console.log(err);
      }
    }
    getCredits();
  }, [props.id]);
  return (
    <div className="casts">
      {
        casts.map((item, i) => (
          <div key={i} className="casts__item">
            <div className="casts__item__img" style={{ backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})` }}></div>
            <p className="casts__item__name">{item.name}</p>
          </div>
        ))
      }
    </div>
  );
}

export default CastList;
