import { NavLink,useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";


const Header = () => {
    const navigate = useNavigate()
    const links = <>
        <li><NavLink to="/">Events</NavLink></li>
        <li><NavLink to="/create">Create Event</NavLink></li>
        <li><NavLink to="/about">Contact</NavLink></li>
    </>

const [user, setUser] = useState(null);
const userId=localStorage.getItem('user_id');

useEffect(() => {

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_ENDPOINT}/users/${userId}`,{
          headers: {
            'Authorization': `Token ${token}`
          }});
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  fetchUser();
}, [userId]); // Fetch user data when userId changes or component mounts


const handleLogout = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get the token from localStorage
  
    // Check if token exists before making the logout request
    if (token) {
      fetch(`${import.meta.env.VITE_ENDPOINT}/tutor/logout/`, {
        method: 'GET', // Change method to POST
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        localStorage.removeItem('token'); // Remove the token from localStorage upon logout
        localStorage.removeItem('user_id'); // Remove the token from localStorage upon logout
        setUser(null);
        navigate('/login'); // Redirect to login page after successful logout
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
    } else {
      console.error('Token not found in localStorage');
      // Handle the case where token is not found (optional)
    }
  };
  


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

                {/* {user?.username? */}
                    <>
                    <NavLink to="/profile" className=" bg-black text-white hover:text-black hover:bg-cyan-400 btn btn-sm btn-ghost">Profile</NavLink>
                <p onClick={handleLogout} className=" bg-black text-white hover:text-black hover:bg-cyan-400 btn btn-sm btn-ghost">Logout</p>
                    </>
                {/* : */}
                    <>
<NavLink to="/login" className=" bg-black text-white hover:text-black hover:bg-cyan-400 btn btn-sm btn-ghost">Login</NavLink>
                <NavLink to="/register" className=" bg-black text-white hover:text-black hover:bg-cyan-400 btn btn-sm btn-ghost">Register</NavLink>
                    </>
                {/* } */}
                {/* <NavLink to="/apply" className=" bg-black text-white hover:text-black hover:bg-cyan-400 btn btn-sm btn-ghost">Apply Now</NavLink> */}
                
                
            </div>
        </div>
    );
};

export default Header;