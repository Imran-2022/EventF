import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";


const Header = () => {
  const navigate = useNavigate()
  const links = <>
    <li><NavLink to="/">Events</NavLink></li>
    <li><NavLink to="/create">Create Event</NavLink></li>
    <li><NavLink to="/about">Contact</NavLink></li>
  </>

  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/user/${userId}`, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        // console.log("userData", userData);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]); // Fetch user data when userId changes or component mounts


  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token'); // Remove the token from localStorage upon logout
    localStorage.removeItem('userId'); // Remove the token from localStorage upon logout
    navigate('/login'); // Redirect to login page after successful logout
    setUser(null);
  }



  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {links}
          </ul>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 text-center">EventM</h1>

      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end gap-1">

        {user?.username ?
          <>
            <NavLink to="/profile" className=" bg-black text-white hover:text-black hover:bg-cyan-400 btn btn-sm btn-ghost">Profile</NavLink>
            <p onClick={handleLogout} className=" bg-black text-white hover:text-black hover:bg-cyan-400 btn btn-sm btn-ghost">Logout</p>
          </>
          :
          <>
            <NavLink to="/login" className=" bg-black text-white hover:text-black hover:bg-cyan-400 btn btn-sm btn-ghost">Login</NavLink>
            <NavLink to="/register" className=" bg-black text-white hover:text-black hover:bg-cyan-400 btn btn-sm btn-ghost">Register</NavLink>
          </>
        }
        {/* <NavLink to="/apply" className=" bg-black text-white hover:text-black hover:bg-cyan-400 btn btn-sm btn-ghost">Apply Now</NavLink> */}


      </div>
    </div>
  );
};

export default Header;