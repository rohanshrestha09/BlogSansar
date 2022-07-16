import { useContext } from 'react';
import userContext from '../../auth/userContext';

const Intro = ({ toggler }) => {
  const user = useContext(userContext);
  const hidelogin = user.user ? true : false;
  const { toggleSide, setToggleSide, toggleSideS, setToggleSideS } = toggler;
  return (
    <div className="text-white w-full h-64 flex justify-evenly px-10 flex-col items-center bg-[rgb(54,57,63)] dark:bg-[rgb(32,34,37)] dark:border-b">
      <p className="font-stylish font-medium text-7xl">
        Blog<span className="text-red-500">Sansar</span>
      </p>
      <p className="text-xl text-center">Join us to discover amazing things.</p>
      <div
        className={`${
          hidelogin ? 'block' : 'hidden'
        } text-2xl md:text-3xl font-stylish text-red-500`}
      >
        Welcome {user.user && user.user.fullname}
      </div>
      <div
        className={`${hidelogin ? 'hidden' : 'flex'} flex justify-between w-44`}
      >
        <input
          type="button"
          value="Signin"
          className="cursor-pointer rounded-md border px-3 py-2 hover:bg-white hover:text-black transition-all duration-400"
          onClick={() => toggleSide && setToggleSide(!toggleSide)}
        />
        <input
          type="button"
          value="Signup"
          className="cursor-pointer rounded-md px-2 py-2 bg-sky-600 hover:bg-[rgba(2,132,199,0.6)] transition-all duration-200"
          onClick={() => toggleSideS && setToggleSideS(!toggleSideS)}
        />
      </div>
    </div>
  );
};

export default Intro;
