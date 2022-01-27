import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
const logo = require('../../assets/images/logo.png');

interface Header {
  current: any
}

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
  const headerRef = React.useRef<HTMLDivElement>(null);

  const active = headerNav.findIndex(e => e.display === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      let myElement = document.getElementById("myElementID");
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        myElement?.classList.add('shrink')
      } else {
        myElement?.classList.remove('shrink')
      }
    }
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header" id='myElementID'>
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">Tix Movie</Link>
        </div>
        <ul className="header__nav">
          {
            headerNav.map((index, item) => (
              <li key={item} className={`${item === active ? 'active' : ''}`}>
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
