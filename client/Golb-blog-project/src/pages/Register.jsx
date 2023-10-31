import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();
console.log();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <div className='flex flex-col justify-center items-center bg-blue-200 h-screen'>
      <h1 className='font-bold text-center p-4 text-2xl '>Register</h1>
      <form className='bg-white p-8 max-w-[320px] min-h-1/4 px-12' onSubmit={handleSubmit}>
        <input onChange={handleChange} name='username' type="text" placeholder='username' required className='block border-b-[1px] border-black my-4 p-1 w-full' />
        <input onChange={handleChange} name='email' type="email" placeholder='email' required className='block border-b-[1px] border-black my-4 p-1 w-full' />
        <input onChange={handleChange} name='password' type="password" placeholder='password' required className='block border-b-[1px] border-black my-4 p-1 w-full' />
        <button onClick={handleSubmit} type="submit" className='block w-full text-white bg-black my-4 p-1 w-full'>Register</button>
        {err &&<p className='text-center pb-2 text-red-500'>{err}</p>}
        <p>Do you have an account? <Link to="/login" className='underline'>Login</Link></p>
      </form>
    </div>
  );
}

export default Register;
