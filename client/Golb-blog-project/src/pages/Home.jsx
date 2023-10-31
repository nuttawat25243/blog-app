import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineArrowRight } from "react-icons/ai";
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/posts/`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className='max-w-7xl mx-auto'>
      {posts.filter(post => post.id === 1).map((post) => {
        return (
          <div className="flex gap-12 mx-4 justify-between mt-24 mb-12 p-4 border-b-[1px] border-black" key={post.id}>
            <div className="w-3/5 flex flex-col gap-5">
              <Link
                className={`p-0.5 hover:underline  hover:text-blue-500 rounded-sm uppercase text-sm p-0.5 px-1`}
                to={`/categories/?cat=${post.cat}`}
              >
                {post.cat}
              </Link>
              <Link className=" hover:underline  hover:text-blue-500 cursor-pointer" to={`/post/${post.id}`}>
                <h1 className="text-4xl font-bold  ">{post.title}</h1>
              </Link>
              <p className='multiline-ellipsis'>{getText(post.desc)}</p>
              
              <Link to={`/post/${post.id}`} className='group mt-4 flex w-max items-center mb-40 hover:text-blue-500'>
                <div  className='flex mr-1 font-semibold border-black border-b-2 group-hover:border-blue-700'>
                  Read More
                </div>
                <AiOutlineArrowRight className='text-center items-center group-hover:border-blue-700' size={'15'} />
              </Link>
            </div>
            <div className="">
              <div className="relative">
                <div className="before:w-full before:h-full before:bg-gray-200 before:absolute before:top-4 before:left-4 before:z-10" />
                <Link className="hover:bg-black bg-blue-500" to={`/post/${post.id}`}>
                  <img className="w-128 h-96 z-20 relative" src={`../upload/${post.img}`} alt="" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      <div className='text-3xl  mx-4 font-semibold mb-8'>Recommended Posts</div>
      <div className='flex  mx-4 flex-row-2 gap-8'>
        {posts.filter(post => (post.id > 1 && post.id < 7)).map(post => {
          return (
            <div className="w-1/3 justify-between mb-12" key={post.id}>
              <div className='flex flex-col gap-2'>
                <Link className="link" to={`/post/${post.id}`}>
                  <img className="w-128 h-72 z-20 relative" src={`../upload/${post.img}`} alt="" />
                </Link>
                <Link
                className={`p-0.5 font-semibold hover:underline hover:text-blue-500 rounded-sm uppercase text-sm p-0.5 px-1`}
                to={`/categories/?cat=${post.cat}`}
              >
                {post.cat}
              </Link>
                <Link className="link" to={`/post/${post.id}`}>
                  <h1 className='text-xl font-bold  hover:text-blue-500  hover:underline '>{post.title}</h1>
                </Link>
                <p className='multiline-ellipsis'>{getText(post.desc)}</p>
                <Link  to={`/post/${post.id}`} className='group mt-4 flex w-max items-center mb-4 hover:text-blue-500'>
                <div className='flex mr-1 font-semibold border-black border-b-2 group-hover:border-blue-700'>
                  Read More
                </div>
                <AiOutlineArrowRight className='text-center items-center group-hover:border-blue-700' size={'15'} />
              </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className='flex items-center justify-center'>
        <Link to='/categories' className='bg-black text-white p-2 mb-12 px-4 rounded-full hover:bg-blue-500'>View More</Link>
      </div>
    </div>
  );
};

export default Home;
