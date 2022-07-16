import { Link } from 'react-router-dom';

const Cards = ({ data }) => {
  return (
    <div className="flex flex-col w-full md:w-11/12 lg:w-3/5 xl:w-7/12">
      {data &&
        data.map(element => (
          <Link
            to={`/blogs/${element._id}`}
            className="flex justify-between h-32 md:h-48 lg:h-44 mb-10 xl:mb-12 cursor-pointer"
            key={element._id}
          >
            <div className="flex flex-col justify-between w-4/6">
              <span className="flex items-center h-auto">
                <img
                  src={element.imgurl}
                  alt=""
                  className="w-7 h-7 rounded-full"
                />
                <p className="text-sm px-2">{element.fullname}</p>
              </span>
              <p className="text-lg md:text-xl font-black break-words">
                {element.title}
              </p>
              <p className="text-sm md:text-base hidden md:block break-words">
                {element.description}
              </p>
              <span className="flex text-xs items-center">
                <p className="mr-1">
                  {new Date(element.createdAt.slice(0, 10))
                    .toDateString()
                    .slice(4, -5)}{' '}
                  &#x22C5;
                </p>
                <p className="rounded-xl bg-[rgba(225,225,225,0.7)] py-1 px-2">
                  {element.category}
                </p>
              </span>
            </div>
            <img
              alt=""
              src={element.imgurlblog}
              className="w-40 md:w-60 h-auto"
            />
          </Link>
        ))}
    </div>
  );
};

export default Cards;
