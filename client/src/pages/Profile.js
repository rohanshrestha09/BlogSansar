import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import userContext from '../auth/userContext';
import ProfileMain from '../components/profile/ProfileMain';
import Post from '../components/profile/Post';

const Profile = () => {
  const { user } = useContext(userContext);
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const fetchedData = await axios.get(`/api/user/profile/${user._id}`);
        setPost(fetchedData.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    user && fetchdata();
    // eslint-disable-next-line
  }, [user]);
  return (
    <div className="h-[92.5vh] w-full font-sans px-4 justify-center flex dark:bg-[rgb(32,34,37)] dark:text-white">
      <div className="w-full md:w-3/4 lg:w-3/5 xl:w-1/2">
        <ProfileMain count={post.length} />
        <Post post={post} />
      </div>
    </div>
  );
};

export default Profile;
