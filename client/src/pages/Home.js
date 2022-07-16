import { useEffect, useState } from 'react';
import axios from 'axios';
import Intro from '../components/homepage/Intro';
import Cards from '../components/homepage/Cards';
import Trending from '../components/homepage/Trending';

const Home = ({ toggler }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const postdata = await axios.get('/api/blogs/all');
        setData(postdata.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getPosts();
  }, []);

  return (
    <div className="w-full font-sans dark:bg-[rgb(32,34,37)] dark:text-white transition-all">
      <Intro toggler={toggler} />
      <div className="w-full flex justify-around px-6 mt-6">
        <Cards data={data} />
        <Trending data={data} />
      </div>
    </div>
  );
};

export default Home;
