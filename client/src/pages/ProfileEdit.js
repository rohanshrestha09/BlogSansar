import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import userContext from '../auth/userContext';

const ProfileEdit = () => {
  const user = useContext(userContext);
  const [saveVal, setSaveVal] = useState('Save');
  const style =
    'w-full p-2 border-2 rounded-md dark:bg-[rgb(32,34,37)] dark:border-1 dark:border-[rgba(225,225,225,0.5)]';
  const [usernameValidation, setUsernameValidation] = useState('');
  const [bioValidation, setBioValidation] = useState('');
  const [updateData, setUpdateData] = useState({
    id: user.user && user.user._id,
    fullname: '',
    username: '',
    email: '',
    bio: '',
    imgurl:
      'https://th.bing.com/th/id/OIP.hN93wSa2UbBZe9hnC3BYnAHaHa?pid=ImgDet&rs=1',
  });

  const { fullname, username, email, bio, imgurl } = updateData;

  useEffect(() => {
    if (bio.split(' ').length > 30)
      return setBioValidation('Must not exceed 30 words');
    return setBioValidation(null);
  }, [bio]);

  const onChange = e => {
    e.preventDefault();
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
    setSaveVal('Save');
  };

  const formUpdate = async e => {
    e.preventDefault();
    if (!bioValidation) {
      try {
        await axios.put('/api/user/profile', updateData);
        setUpdateData({
          fullname: '',
          username: '',
          email: '',
          bio: '',
          imgurl:
            'https://th.bing.com/th/id/OIP.hN93wSa2UbBZe9hnC3BYnAHaHa?pid=ImgDet&rs=1',
        });
        user.setLogin(true);
        setUsernameValidation(null);
        setSaveVal('Success');
        user.setLogin(true);
      } catch (error) {
        setUsernameValidation(error.response.data);
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-1 md:py-4 dark:bg-[rgb(32,34,37)] min-h-[92.5vh] dark:text-white transition-all">
      <form
        className="flex flex-col justify-between w-11/12 md:w-3/5 lg:w-1/2 xl:w-5/12 md:h-[82vh] h-full dark:bg-[rgb(32,34,37)]"
        onSubmit={formUpdate}
      >
        <div className="flex bg-black text-white py-1 items-center rounded-full self-start px-2 dark:text-black dark:bg-white">
          <img
            src={user.user && user.user.imgurl}
            alt=""
            className="rounded-full w-7 h-7"
          />
          <p className="px-1">{user.user && user.user.fullname}</p>
        </div>
        <div>
          <label>Change profile image</label>
          <div>
            <input
              type="text"
              placeholder="Image link (optional)"
              name="imgurl"
              value={imgurl}
              className={style}
              onChange={onChange}
              required
            />
            <p className="text-sm">
              Provide a image url to change your display picture.
            </p>
          </div>
        </div>
        <div>
          <label>Full Name</label>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={fullname}
              className={style}
              onChange={onChange}
              required
            />
            <p className="text-sm">
              Provide a name so that people can identify your account.
            </p>
          </div>
        </div>
        <div>
          <label>Username</label>
          <div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              className={style}
              onChange={onChange}
              required
            />
            <span className="text-xs pl-2 text-[#DE3545] ">
              {usernameValidation}
            </span>
            <p className="text-sm">Provide a unique name for your account.</p>
          </div>
        </div>
        <div>
          <label>Email</label>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              className={style}
              onChange={onChange}
              required
            />
            <p className="text-sm">
              Provide a valid email address incase of account recovery.
            </p>
          </div>
        </div>
        <div>
          <label>Bio</label>
          <div>
            <textarea
              placeholder="Write about yourself"
              name="bio"
              value={bio}
              className={style}
              onChange={onChange}
            ></textarea>
            <span className="text-xs pl-2 text-[#DE3545] ">
              {bioValidation}
            </span>
            <p className="text-sm">
              Briefly describe yourself in less than 30 words.
            </p>
          </div>
        </div>
        <hr />
        <input
          type="submit"
          value={saveVal}
          className="cursor-pointer w-20 rounded-md py-1 bg-blue-500 text-white hover:bg-blue-400"
        />
      </form>
    </div>
  );
};

export default ProfileEdit;
