import { useContext, useState } from 'react';
import userContext from '../auth/userContext';
import axios from 'axios';

const Create = () => {
  const { user } = useContext(userContext);
  const [publish, setPublish] = useState('Publish');

  const [postData, setPostData] = useState({
    postedby: user && user._id,
    title: '',
    description: '',
    body: '',
    category: 'Others',
    imgurlblog: '',
  });
  const { title, description, body, imgurlblog } = postData;

  const onChange = e => {
    e.preventDefault();
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
    setPublish('Publish');
  };

  const formSubmission = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/blogs/post', postData);
      setPostData({
        postedBy: user ? user._id : '',
        title: '',
        description: '',
        body: '',
        category: 'Others',
        imgurlblog: '',
      });
      setPublish('Done');
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="flex justify-center px-2 py-4 w-full dark:bg-[rgb(32,34,37)] dark:text-white min-h-[92.5vh] transition-all">
      <form
        className="flex flex-col w-11/12 md:w-3/5 lg:w-1/2 xl:w-5/12"
        onSubmit={formSubmission}
      >
        <div className="flex items-center justify-between pb-6">
          <div className="flex items-center rounded-full px-2 py-1 bg-[rgb(32,34,37)] text-white dark:text-black dark:bg-white">
            <img
              src={user && user.imgurl}
              alt=""
              className="rounded-full w-7 h-7"
            />
            <p className="text-sm px-1">{user && user.fullname}</p>
          </div>
          <input
            type="submit"
            value={publish}
            className="rounded-lg bg-blue-500 px-2 py-1 cursor-pointer hover:bg-blue-400 text-white"
          />
        </div>
        <div className="flex flex-col py-3">
          <label>Add a title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="rounded-lg p-2 dark:bg-[rgb(32,34,37)]"
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className="flex flex-col py-3">
          <label>Add a short description</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="rounded-lg px-2 py-3 dark:bg-[rgb(32,34,37)]"
            value={description}
            onChange={onChange}
            required
          />
        </div>
        <div className="flex flex-col py-3">
          <label>Write the content (HTML tags are also supported)</label>
          <textarea
            rows="4"
            cols=""
            name="body"
            placeholder="Body"
            className="rounded-lg px-2 py-3 dark:bg-[rgb(32,34,37)]"
            value={body}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div className="flex flex-col py-3">
          <label>Add image url</label>
          <input
            type="text"
            name="imgurlblog"
            placeholder="Image Link"
            className="rounded-lg p-2 dark:bg-[rgb(32,34,37)]"
            value={imgurlblog}
            onChange={onChange}
          />
        </div>
        <div className="py-3">
          <select
            name="category"
            className="rounded-lg cursor-pointer py-1 dark:bg-[rgb(32,34,37)]"
            onChange={onChange}
          >
            <option value="Others">Choose a category</option>
            {[
              'Sports',
              'Programming',
              'Web Development',
              'Science',
              'Lifestyles',
              'Software Engineering',
              'Other',
            ]
              .sort()
              .map(element => (
                <option key={element} value={element}>
                  {element}
                </option>
              ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Create;
