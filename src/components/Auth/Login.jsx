import React, { useState } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
const Login = () => {
    // console.log(import.meta.env.VITE_ENDPOINT)
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputs((prevInputs) => ({ ...prevInputs, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic
        const {username,password} = inputs;
        // console.log({username,password})

        fetch(`${import.meta.env.VITE_ENDPOINT}/tutor/login/`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json', // Note the quotes around 'Content-Type'
              },
              body: JSON.stringify({username,password}),
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            localStorage.setItem('token',data.token)
            localStorage.setItem('user_id',data.user_id)
            if(data.user_id){
                navigate('/profile');
            }
        })
    };

    return (
        <div className="py-10 flex items-center justify-center min-h-[85vh]">
            <form className="flex flex-col bg-white rounded shadow-lg p-12 w-96" onSubmit={handleSubmit}>
                <label className="font-semibold text-xs" htmlFor="usernameField">username</label>
                <input
                    className="h-12 px-4 border shadow mt-2 rounded focus:outline-none focus:ring-2"
                    type="text"
                    name="username"
                    value={inputs.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                />
                <label className="font-semibold text-xs mt-3" htmlFor="passwordField">Password</label>
                <input
                    className="h-12 px-4 border shadow mt-2 rounded focus:outline-none focus:ring-2"
                    type="password"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    placeholder="Enter your Password"
                    required
                />
                <button className="h-12 mt-8 bg-blue-600 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700" type="submit">Login</button>
                <div className="flex mt-6 justify-center text-xs">
                    <Link to="/forget-password" className="text-blue-400 hover:text-blue-500">Forgot Password</Link>
                    <span className="mx-2 text-gray-300">/</span>
                    <Link to="/register" className="text-blue-400 hover:text-blue-500">Register</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
