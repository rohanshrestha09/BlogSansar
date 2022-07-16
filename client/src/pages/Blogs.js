import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import Trending from '../components/homepage/Trending';
import parse from 'html-react-parser';
import axios from 'axios';

const Blogs = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const posts = async () => {
      try {
        const postdata = await axios.get(`/api/blogs/get/${id}`);
        setData(postdata.data);
        if (!data) navigate('/');
      } catch (err) {
        console.log(err.response.data);
      }
    };
    posts();
    // eslint-disable-next-line
  }, [id]);

  const [dataTrend, setDataTrend] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const postdata = await axios.get('/api/blogs/all');
        setDataTrend(postdata.data);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    getPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-full flex justify-around p-6 min-h-[92.5vh] dark:bg-[rgb(32,34,37)] dark:text-white transition-all">
      <div className="md:w-3/4 lg:w-1/2 w-full flex flex-col">
        <div className="flex items-center pb-3">
          {console.log(1)}
          <img
            src={data && data.imgurl}
            alt=""
            className="w-16 h-16 rounded-full mr-3"
          />
          <div className="flex flex-col text-[rgba(0,0,0,0.8)] h-14 justify-between dark:text-white">
            <div className="flex items-center">
              <p>{data && data.fullname}</p>
              <input
                type="submit"
                value="Follow"
                className="bg-blue-500 text-white px-2 py-1 rounded-2xl ml-2 text-sm hover:bg-blue-400 cursor-pointer"
              />
            </div>
            <div className="flex items-center">
              <p className="text-sm">
                {data &&
                  data.createdAt &&
                  new Date(data.createdAt.slice(0, 10))
                    .toDateString()
                    .slice(4, -5)}
              </p>
              <div className="flex w-40 justify-evenly text-[rgba(0,0,0,0.5)] dark:text-[rgba(225,225,225,0.5)]">
                <FaTwitter
                  size="18"
                  className="hover:text-black cursor-pointer dark:hover:text-white"
                />
                <FaFacebook
                  size="18"
                  className="hover:text-black cursor-pointer dark:hover:text-white"
                />
                <FaLinkedin
                  size="18"
                  className="hover:text-black cursor-pointer dark:hover:text-white"
                />
                <FaGithub
                  size="18"
                  className="hover:text-black cursor-pointer dark:hover:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="flex flex-col items-center py-3 w-full">
          <p className="font-black text-3xl pb-4 self-start break-words w-full">
            {data && data.title}
          </p>
          <img
            src={data && data.imgurlblog}
            alt=""
            className="h-auto md:h-3/4 lg:h-96 w-full pb-4"
          />
          <div className="self-start">
            {data && data.body && parse(`<div>${data.body}</div>`)}
          </div>
        </div>
      </div>
      <Trending data={dataTrend} />
    </div>
  );
};

export default Blogs;
