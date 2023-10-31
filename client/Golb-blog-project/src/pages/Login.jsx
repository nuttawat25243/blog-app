import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authcontext.jsx";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();
  const {login} = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
console.log(inputs);
  return (
    <>
    <div className='flex flex-col justify-center items-center bg-blue-200 h-screen'>
         <h1 className='font-bold text-center p-4  text-2xl '>Login</h1>
         <form className='bg-white p-8 max-w-[320px] min-h-1/4 px-12' action="">
            <input required onChange={handleChange} name="username" className='block border-b-[1px] border-black my-4 p-1 w-full' type="username" placeholder='username' />
            <input required onChange={handleChange} name="password" className='block border-b-[1px] border-black my-4 p-1  w-full ' type="password" placeholder='password' />
            <button onClick={handleSubmit} className='block w-full text-white bg-black my-4 p-1  w-full' >Login</button>
            {err && <p className=' text-center pb-2 text-red-500'>{err}</p>}
            <p>Don't you have an account? <a className='underline' href="/register">Register</a></p>
         </form>
        </div>
    </>
  );
}

export default Login;
