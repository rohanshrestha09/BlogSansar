import { useEffect, useState, useContext } from 'react';
import { GiCrossedBones } from 'react-icons/gi';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import userContext from '../auth/userContext';

const Signup = ({ toggler }) => {
  const user = useContext(userContext);
  const { toggleSideS, setToggleSideS, toggleSide, setToggleSide } = toggler;
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const { fullname, username, email, password, confirmpassword } = signup;

  const [usernameValidation, setUsernameValidation] = useState('');
  const [passwordValidation, setPasswordValidation] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [submit, setSubmit] = useState('Submit');

  const onChange = e => {
    e.preventDefault();
    setSignup({
      ...signup,
      [e.target.name]: e.target.value,
    });
    setSubmit('Submit');
  };

  useEffect(() => {
    if (username !== '' && username.length < 5)
      return setUsernameValidation(
        'Username must contain atleast 5 characters'
      );

    if (username.length > 9)
      return setUsernameValidation('Username must not exceed 9 characters');

    return setUsernameValidation(null);
  }, [username]);

  useEffect(() => {
    if (password !== '' && password.length < 8)
      return setPasswordValidation(
        'Password must contain atleast 8 characters'
      );

    if (password.length > 16)
      return setPasswordValidation('Password must not exceed 16 characters');

    return setPasswordValidation(null);
  }, [password]);

  useEffect(() => {
    if (password !== confirmpassword)
      return setPasswordCheck('Password does not match');

    return setPasswordCheck(null);
    //eslint-disable-next-line
  }, [confirmpassword]);

  const formSubmission = async event => {
    event.preventDefault();

    if (!usernameValidation && !passwordValidation && !passwordCheck) {
      try {
        const response = await axios.post('/api/user/register', signup);
        localStorage.setItem('id', response.data);
        user.setLogin(true);
        setSignup({
          fullname: '',
          username: '',
          email: '',
          password: '',
          confirmpassword: '',
        });
        setSubmit('Success');
        setToggleSideS(true);
        navigate('/');
      } catch (error) {
        return setUsernameValidation(error.response.data);
      }
    }
  };

  return (
    <div
      className={`h-screen w-full ${
        toggleSideS ? 'hidden' : 'fixed'
      } bg-[rgba(0,0,0,0.3)] top-0`}
    >
      <div className="absolute h-screen right-0 w-[70%] md:w-2/5 lg:w-1/3 xl:w-[21%] bg-[#ffffff] z-10">
        <p className="font-semibold text-xl text-center py-4">
          Create an account
        </p>
        <GiCrossedBones
          className="absolute right-4 top-6 cursor-pointer"
          onClick={() => setToggleSideS(!toggleSideS)}
        />
        <hr />
        <form
          className="flex h-[89%] px-5 w-full flex-col justify-between text-lg font-normal"
          onSubmit={formSubmission}
        >
          <div className="h-full flex flex-col justify-evenly">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={fullname}
              className="px-4 rounded-xl w-full py-2 border focus:outline-1 focus:outline-[#3182ce]"
              onChange={onChange}
              required
            />
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
            <label>Email</label>
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={email}
              className="px-4 rounded-xl w-full py-2 border focus:outline-1 focus:outline-[#3182ce]"
              onChange={onChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              className="px-4 rounded-xl w-full py-2 border focus:outline-1 focus:outline-[#3182ce]"
              onChange={onChange}
              required
            />
            <span className="text-xs pl-2 text-[#DE3545]">
              {passwordValidation}
            </span>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              name="confirmpassword"
              value={confirmpassword}
              className="px-4 rounded-xl w-full py-2 border focus:outline-1 focus:outline-sky-700"
              onChange={onChange}
              required
            />
            <span className="text-xs pl-2 text-[#DE3545]">{passwordCheck}</span>
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
            <p
              className="text-center text-lg text-indigo-500 cursor-pointer"
              onClick={() => {
                setToggleSide(!toggleSide);
                setToggleSideS(!toggleSideS);
              }}
            >
              Signin &#x27A4;
            </p>
          </div>
          <div className="text-right">
            <hr />
            <div>
              <input
                type="button"
                value="Cancel"
                className="border mr-2 mt-4 rounded-md px-3 py-2 border-black font-medium cursor-pointer hover:bg-[rgba(0,0,0,0.1)] transition-all duration-200"
                onClick={() => setToggleSideS(!toggleSideS)}
              />
              <input
                type="submit"
                value={submit}
                className="rounded-md px-3 py-2 border-black bg-[#3182ce] text-white font-medium cursor-pointer hover:bg-[rgba(49,130,206,0.7)] transition-all duration-200"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
