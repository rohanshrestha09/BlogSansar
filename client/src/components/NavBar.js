import { useContext, useEffect, useState } from 'react';
import userContext from '../auth/userContext';
import { HiSun } from 'react-icons/hi';
import { BsMoon } from 'react-icons/bs';
import NavBarlist from './NavBarlist';

const NavBar = ({ toggler }) => {
  const user = useContext(userContext);
  const [mode, setMode] = useState('light');
  localStorage.theme = mode;
  const hidelogin = user.user ? true : false;
  const { toggleSide, setToggleSide, toggleSideS, setToggleSideS } = toggler;

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return (
    <>
      {' '}
      <div className="w-full h-24 md:h-14 px-4 md:justify-between flex items-center flex-col-reverse md:flex-row justify-evenly sticky top-0 overflow-hidden bg-[rgb(32,34,37)] text-white">
        <div className="flex justify-evenly md:w-7/12 xl:w-5/12 w-full">
          <img
            alt=""
            src="https://img00.deviantart.net/11ea/i/2016/146/c/a/metallica_mangekyo_sharingan_by_wolblade-da3vpfr.png"
            className="hidden text-white h-8 w-8 md:flex mx-2 animate-spin"
          />
          <div className="inline-flex list-none justify-between md:justify-around items-center w-full ">
            <NavBarlist />
          </div>
        </div>
        <div className="inline-flex justify-around items-center w-full md:w-2/5 xl:w-5/12">
          <img
            alt=""
            src="https://img00.deviantart.net/11ea/i/2016/146/c/a/metallica_mangekyo_sharingan_by_wolblade-da3vpfr.png"
            className="text-white h-8 w-8 md:hidden animate-spin"
          />
          <div className={`md:${hidelogin ? 'flex' : 'hidden'} hidden`}>
            <img
              alt=""
              src={user.user && user.user.imgurl}
              className="w-6 h-6 rounded-full mr-1"
            />
            {user.user && user.user.username}
          </div>
          <input
            type="button"
            value="Sign in"
            className={`hidden md:${
              hidelogin ? 'hidden' : 'block'
            } hover:text-red-500 transition-all duration-200 cursor-pointer`}
            onClick={() => toggleSide && setToggleSide(!toggleSide)}
          />
          <input
            type="button"
            value="Sign up"
            className={`py-1 hidden px-2 border rounded-lg md:${
              hidelogin ? 'hidden' : 'block'
            } hover:bg-white hover:text-black transition-all duration-200 ml-2 cursor-pointer`}
            onClick={() => toggleSideS && setToggleSideS(!toggleSideS)}
          />
          <input
            type="search"
            placeholder="Search"
            className="text-black py-1 rounded-lg ml-2 px-2 w-[75%] md:w-[45%] xl:w-[60%]"
          />
          <div className="text-2xl ml-2 cursor-pointer">
            {localStorage.theme === 'light' ? (
              <BsMoon onClick={() => setMode('dark')} />
            ) : (
              <HiSun onClick={() => setMode('light')} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
