const ProfileAuth = ({ toggler }) => {
  const { toggleSide, setToggleSide, toggleSideS, setToggleSideS } = toggler;
  return (
    <div className="w-full flex flex-col h-[80vh] items-center justify-center">
      <p className="text-2xl font-semibold mb-3">Signin to continue</p>
      <div>
        {' '}
        <input
          type="button"
          value="Signin"
          className="cursor-pointer rounded-md border px-3 py-2 hover:bg-black border-black hover:text-white transition-all duration-400 mr-4"
          onClick={() => toggleSide && setToggleSide(!toggleSide)}
        />
        <input
          type="button"
          value="Signup"
          className="text-white cursor-pointer rounded-md px-2 py-2 bg-sky-600 hover:bg-[rgba(2,132,199,0.6)] transition-all duration-200"
          onClick={() => toggleSideS && setToggleSideS(!toggleSideS)}
        />
      </div>
    </div>
  );
};

export default ProfileAuth;
