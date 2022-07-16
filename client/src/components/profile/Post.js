import { Link } from 'react-router-dom';
import axios from 'axios';

const Post = ({ post }) => {
  const alertNotif = async _id => {
    if (window.confirm('Are you sure you want to delete the post?') === true) {
      await axios.delete(`/api/blogs/delete/${_id}`);
    }
    return;
  };

  return (
    <div className="px-0 my-6 w-full">
      <div className="flex flex-col">
        {post.map(element => (
          <Link
            to={`/blogs/${element._id}`}
            className="flex justify-between h-32 md:h-48 lg:h-44 mb-10 xl:mb-12 cursor-pointer"
            key={element._id}
          >
            <div className="flex flex-col justify-between w-4/6">
              <p className="text-lg md:text-xl font-black break-words">
                {element.title}
              </p>
              <p className="text-sm md:text-base hidden md:block break-words">
                {element.description}
              </p>
              <span className="flex text-xs items-center">
                <p className="mr-1">
                  {element.createdAt &&
                    new Date(element.createdAt.slice(0, 10))
                      .toDateString()
                      .slice(4, -5)}{' '}
                  &#x22C5;
                </p>
                <p className="rounded-xl bg-[rgba(225,225,225,0.7)] py-1 px-2">
                  {element.category}
                </p>
              </span>
              <input
                type="button"
                value="Delete"
                className="text-sm self-start mt-2 py-1 px-2 rounded-md bg-[#DC3545] text-white hover:bg-[rgb(220,53,69,0.8)] transition-all cursor-pointer"
                onClick={() => alertNotif(element._id)}
              />
            </div>
            <img
              alt=""
              src={element.imgurlblog}
              className="w-40 md:w-60 h-auto"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Post;
