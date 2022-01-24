import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';

const headerNav = [
  {
    display: "Home",
    path: '/'
  },
  {
    display: "Movie",
    path: '/movie'
  },
  {
    display: "TV Series",
    path: '/tv'
  },
]

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex(e => e.display === pathname);



  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src="https://play-lh.googleusercontent.com/BGCtAtNN1Ck_ke7wU-7EDps4y1EFoufBGSvbdyVYERpGPh2OA2_dF-Ovcx8lFF-pKVI" alt="" />
        </div>
        <ul className="header__nav">
          {
            headerNav.map((index, item) => (
              <li key={item} className={`${item === active ? 'active' : ""}`}>
                <Link to={index.path}>
                  {index.display}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default Header;
