import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const NavBarlist = () => {
  const location = useLocation();
  const [dropdownDisplay, setDropdownDisplay] = useState(true);
  const ftrue = () => {
    setDropdownDisplay(false);
  };
  const ffalse = () => {
    setDropdownDisplay(true);
  };
  return (
    <>
      <Link
        to="/"
        className={`hover:text-red-500 transition-all duration-200 ${
          location.pathname === '/' && 'text-red-500'
        }`}
      >
        Home
      </Link>
      {['Profile', 'Create', 'Settings'].map(element => {
        return (
          <Link
            to={`/${element.toLowerCase()}`}
            key={element}
            className={`hover:text-red-500 transition-all duration-200 ${
              '/' + element.toLowerCase() === location.pathname &&
              'text-red-500'
            }`}
          >
            {element}
          </Link>
        );
      })}
      <div
        className={`hover:text-red-500 transition-all duration-200 cursor-pointer`}
        onMouseEnter={() => ftrue()}
        onMouseLeave={() => ffalse()}
      >
        Categories
        <div
          className={`fixed rounded-lg ${
            dropdownDisplay ? 'hidden' : 'block'
          } text-white bg-[rgb(32,34,37)] w-[200px] `}
        >
          {[
            'Sports',
            'Programming',
            'Web Development',
            'Science',
            'Lifestyles',
            'Software Engineering',
            'Communication',
            'Beauty',
            'Travel',
            'Other',
          ]
            .sort()
            .map(element => (
              <li
                className="p-3 text-white hover:text-red-500 transition-all duration-200"
                key={element}
              >
                {element}
              </li>
            ))}
        </div>
      </div>
    </>
  );
};

export default NavBarlist;
