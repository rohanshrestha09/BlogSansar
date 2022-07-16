import { useContext } from 'react';
import { BiLogOut, BiMessageSquareEdit } from 'react-icons/bi';
import { CgNotifications } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import userContext from '../../auth/userContext';

const ProfileMain = ({ count }) => {
  const user = useContext(userContext);
  return (
    <>
      <div className="flex h-52 justify-between items-center w-full md:px-10">
        <div className="w-1/4 flex flex-col items-center">
          <img
            src={user.user && user.user.imgurl}
            alt=""
            className="w-32 h-32 rounded-full"
          />
          <p className="pt-2 text-xs text-blue-500">
            {user.user && user.user.username}
          </p>
        </div>
        <div className="py-6 flex flex-col w-2/3 h-48 justify-evenly ">
          <p className="text-xl font-semibold">
            {user.user && user.user.fullname}
          </p>
          <div className="w-full flex justify-between font-bold md:text-base text-sm">
            <p>{count} posts</p>
            <p>0 following</p>
            <p>0 followers</p>
          </div>
          <p className="text-sm leading-none text-[rgba(0,0,0,0.7)] dark:text-white">
            {user.user && user.user.bio}
          </p>
        </div>
      </div>
      <hr />
      <div className="flex md:justify-around justify-between py-4">
        <Link to="/profileedit">
          <input
            type="button"
            value="Edit profile"
            className="w-24 md:w-28 py-1 border rounded-md border-black dark:hover:text-black dark:hover:bg-white dark:border-white cursor-pointer hover:text-white hover:bg-[rgb(32,32,32)] transition-all"
          />
        </Link>
        <Link to="/create">
          <input
            type="button"
            value="Create"
            className="w-24 md:w-28 py-1 border rounded-md cursor-pointer border-black dark:hover:bg-white dark:hover:text-black dark:border-white hover:text-white hover:bg-[rgb(32,32,32)] transition-all"
          />
        </Link>
        <div className="w-24 md:w-28 py-1 rounded-md bg-[#DC3545] flex justify-evenly items-center cursor-pointer text-white hover:bg-[rgb(220,53,69,0.8)]">
          <div onClick={() => user.userLogout()}>Logout</div>
          <BiLogOut size="23" />
        </div>
      </div>
      <hr />
      <div className="w-full flex justify-between pt-5">
        <div className="border-black dark:border-white border-b-2 flex items-center pb-1">
          <p className="px-2">Your Posts</p>
          <BiMessageSquareEdit size="20" />
        </div>
        <div className="flex items-center pb-1">
          <p className="px-2">Notifications</p>
          <CgNotifications size="20" />
        </div>
      </div>
    </>
  );
};

export default ProfileMain;
