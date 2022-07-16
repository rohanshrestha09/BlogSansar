import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiCrossedBones } from 'react-icons/gi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import userContext from '../auth/userContext';
import axios from 'axios';

const Signin = ({ toggler }) => {
  const navigate = useNavigate();
  const user = useContext(userContext);
  const [usernameValidation, setUsernameValidation] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('');
  const { toggleSideS, setToggleSideS, toggleSide, setToggleSide } = toggler;
  const [signin, setSignin] = useState({
    username: '',
    password: '',
  });
  const { username, password } = signin;

  const onChange = e => {
    e.preventDefault();
    setSignin({
      ...signin,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmission = async event => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/user/login', signin);
      localStorage.setItem('id', response.data);
      setToggleSide(true);
      navigate('/');
      user.setLogin(true);
      setSignin({
        username: '',
        password: '',
      });
    } catch (error) {
      console.log(error);
      if (error.response.data.includes('User'))
        return setUsernameValidation(error.response.data);
      if (error.response.data.includes('Password'))
        setPasswordValidation(error.response.data);
    }
  };

  return (
    <div
      className={`h-screen w-full ${
        toggleSide ? 'hidden' : 'fixed'
      } bg-[rgba(0,0,0,0.3)] top-0 transition-all`}
    >
      <div className="absolute h-screen right-0 w-[70%] md:w-2/5 lg:w-1/3 xl:w-[21%] bg-[#ffffff] z-10 transition-all duration-700">
        <p className="font-semibold text-xl text-center py-4">Signin</p>
        <GiCrossedBones
          className="absolute right-4 top-6 cursor-pointer"
          onClick={() => setToggleSide(!toggleSide)}
        />
        <hr />
        <form
          className="flex h-[89%] px-5 w-full flex-col justify-between text-lg font-normal"
          onSubmit={formSubmission}
        >
          <div className="h-80 flex flex-col justify-evenly">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              className="px-4 rounded-xl w-full py-2 border focus:outline-1 focus:outline-[#3182ce]"
              onChange={onChange}
              required
            />
            <span className="text-xs pl-2 text-[#DE3545] ">
              {usernameValidation}
            </span>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              className="px-4 rounded-xl w-full py-2 border focus:outline-1 focus:outline-sky-700"
              onChange={onChange}
              required
            />
            <span className="text-xs pl-2 text-[#DE3545] ">
              {passwordValidation}
            </span>
            <div className="flex justify-around w-full">
              <FcGoogle
                size="48"
                className="border rounded-xl border-black p-3"
              />
              <FaFacebook
                size="48"
                className="border rounded-xl border-black p-3"
              />
              <FaGithub
                size="48"
                className="border rounded-xl border-black p-3"
              />
            </div>
            <p className="text-center text-base">
              Don't have one?{' '}
              <span
                className="text-indigo-500 cursor-pointer"
                onClick={() => {
                  setToggleSide(!toggleSide);
                  setToggleSideS(!toggleSideS);
                }}
              >
                Create account.
              </span>
            </p>
          </div>
          <div className="text-right">
            <hr />
            <div>
              <input
                type="button"
                value="Cancel"
                className="border mr-2 mt-4 rounded-md px-3 py-2 border-black font-medium cursor-pointer hover:bg-[rgba(0,0,0,0.1)] transition-all duration-200"
                onClick={() => setToggleSide(!toggleSide)}
              />
              <input
                type="submit"
                value="Submit"
                className="rounded-md px-3 py-2 border-black bg-[#3182ce] text-white font-medium cursor-pointer hover:bg-[rgba(49,130,206,0.7)] transition-all duration-200"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
