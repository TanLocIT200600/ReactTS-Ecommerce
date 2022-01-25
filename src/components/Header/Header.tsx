import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';

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
  // const headerRef = useRef(null);
  const headerRef = React.useRef<HTMLDivElement>(null);

  const active = headerNav.findIndex(e => e.display === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      let myElement = document.getElementById("myElementID");
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        // headerRef.current.classList.add('shrink');
        myElement?.classList.add('shrink')
      } else {
        // headerRef.current.classList.remove('shrink');
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
