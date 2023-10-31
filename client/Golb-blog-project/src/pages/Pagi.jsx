import React, {  useEffect, useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import './Home.css'
import { AiOutlineArrowRight } from 'react-icons/ai';
const Categories = () => {
  const cat = useLocation().search;
  const [text, setText] = useState("");
  const Textchange = (cat) => {
    if (cat === '?cat=art') {
      setText('Art');
    } else if (cat === '?cat=business') {
      setText('Business');
    } else if (cat === '?cat=cinema') {
      setText('Cinema');
    }else if (cat === '?cat=food') {
      setText('Food');
    }else if (cat === '?cat=technology') {
      setText('Technology');
    } else {
      setText('GLOBlog');
    }
  };

  useEffect(() => {
    Textchange(cat);
  }, [cat]);
  
  const [page, setPage] = useState(1); // Default to page 1
  const [pageSize, setPageSize] = useState(10); // Default to 10 items per page
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    axios.get(`/api/post?cat=${cat}&page=${page}&pageSize=${pageSize}`)
      .then(response => {
        const { data } = response;
        setPosts(data);
        setTotalPages(Math.ceil(data.length / pageSize));
      })
      .catch(error => {
        console.error(error);
      });
  }, [cat, page, pageSize]);

  const handlePageChange = selectedPage => {
    setPage(selectedPage.selected + 1); // React Paginate starts page numbers from 0
  };




  return (
    <div className='max-w-7xl mx-auto'>
   <div className='text-center font-semibold text-7xl m-12 mb-4'>{text}</div>
   <p className='text-center font-semibold text-xl m-4 mb-12'>An online journal where an individual, group, or corporation presents a record of activities, thoughts, or beliefs.</p>
      <div className='flex flex-wrap'>
      {posts.map((post) => {
              const dated = new Date(post.date);
              const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              const formattedDate = dated.toLocaleString("en-US", options);
             return (
                  <div className=' flex w-72  m-4 gap-8'>
                        <div className="  mb-12" key={post.id}>
                          <div className='flex flex-col gap-1'>
                            <Link to={`/post/${post.id}`}>
                              <img className="items-center w-[300px] h-[200px] z-20 relative" src={`../upload/${post.img}`} alt="" />
                            </Link>
                            <Link className="link" to={`/post/${post.id}`}>
                              <h1 className='text-xl font-bold title-ellipsis h-20'>{post.title}</h1>
                            </Link>
                            <Link className='mt-4 flex items-center'>
                              <div to={`/post/${post.id}`} className='inline-flex border-b-2 border-black mr-1 font-semibold'>Read More</div>
                              <AiOutlineArrowRight size={'15'} />
                            </Link>
                          </div>
                        </div>
                  </div>
                      );
                })} 
        </div>
        <ReactPaginate className='flex text-center p-4 justify-center gap-4'
        previousLabel={"<"}
        nextLabel={">"}
        breakLabel={"..."}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName={"flex  justify-center gap-1 text-xs font-medium "}
        pageClassName={"inline-flex h-8 w-8 items-center justify-center rounded border border-black bg-white "}
        pageLinkClassName={" text-center p-1 px-2.5  justify-center"}
        previousClassName={"inline-flex h-8 w-8 items-center  justify-center rounded border border-black bg-white "}
        previousLinkClassName={" text-center justify-center"}
        nextClassName={"inline-flex h-8 w-8 items-center  justify-center rounded border  border-black bg-white "}
        nextLinkClassName={" text-center p-1 px-2.5  justify-center"}
        breakClassName={"inline-flex h-8 w-8 items-center  justify-center rounded border  border-black bg-white "}
        breakLinkClassName={" text-center p-1 px-2.5  justify-center"}
        activeClassName={"bg-gray-500"}
        />
    </div>
        );
      }
      export default Categories;
