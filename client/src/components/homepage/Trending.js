import { Link } from 'react-router-dom';

const Trending = ({ data }) => {
  return (
    <div className="hidden lg:block w-1/4">
      <p className="text-base font-stylish">TRENDING TODAY </p>
      <hr />
      <div className="flex flex-col">
        {data &&
          data.map(element => (
            <Link
              to={`/blogs/${element._id}`}
              key={element._id}
              className="cursor-pointer py-4"
            >
              <span className="flex items-center h-auto">
                <img
                  alt=""
                  src={element.imgurl}
                  className="w-6 h-6 rounded-full mr-1"
                />
                <p className="text-sm px-2">{element.fullname}</p>
              </span>
              <p className="text-base font-bold break-words">{element.title}</p>
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
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Trending;
