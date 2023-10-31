import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import moment from 'moment';
import { useNavigate,useLocation } from 'react-router-dom';
const Write = ()=> {
  const state = useLocation().state;
  const [value,setValue] = useState(state?.desc || "");
  const [title,setTitle] = useState(state?.title || "");  
  const [file,setFile] = useState(null);
  const [cat,setCat] = useState(state?.cat || "");
  const navigate = useNavigate()
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/api/posts/${state.id}`, {
            title: title,
            desc: value,
            cat: cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/api/posts/`, {
          title: title,
            desc: value,
            cat: cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='max-w-6xl  m-auto'>
      <div className='flex justify-center m-4 p-2 gap-4 '>
      <div className='w-3/4 flex   flex-col gap-4 h-auto '>
        <div className='w-full  border-[1px]  '>
        <input className='w-full p-2'
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
         <div className='h-full  bg-white    '>
            <ReactQuill
              theme='snow'
              value={value}
              onChange={setValue}
              className='h-full overflow-hidden border-[1px] ' // Set the height of ReactQuill to '100%'
            />
          </div>
     </div>
     <div className="flex flex-col w-1/4 gap-4">
        <div className="flex flex-col gap-2 p-2 border-[1px]">
          <h1 className='font-bold text-xl'>Publish</h1>
          <span className='text-sm'>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="underline    " htmlFor="file">
            Upload Image
          </label>
          <div className="flex justify-between my-1 ">
            <button className='border-2 border-black cursor-pointer   p-1'> Save as a draft</button>
            <button onClick={handleClick} className='bg-black text-white cursor-pointer  p-1'>Publish</button>
          </div>
        </div>
        <div className="border-[1px] flex flex-col gap-2 p-2">
          <h1 className='font-bold text-xl '>Category</h1>
          <div className="">
            <input
              type="radio"
             checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
             onChange={(e) => setCat(e.target.value)}
            />
            <label className='' htmlFor="art"> Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
            checked={cat === "business"}
              name="cat"
              value="business"
              id="business"
            onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="business"> Business</label>
          </div>
          <div className="cat">
            <input
              type="radio"
             checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
          onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema"> Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
             checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food"> Food</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
             onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology"> Technology</label>
          </div>
         
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write