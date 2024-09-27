import React, { useState } from 'react';
import { Link} from 'react-router-dom';

const Forget = () => {
    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    const isSuccess=false;
    const isLoading=false;

    return isSuccess ? (
        <div className="flex flex-col items-center justify-center w-full h-[60vh]  text-gray-700">
            <div className="w-full sm:w-1/2 shadow-lg  p-5 rounded-lg lg:rounded-l-none">
                <div className="px-8 mb-4 text-center">
                    <h3 className="pt-4 mb-2 text-2xl">Success!</h3>
                    <p className="mb-4 text-sm text-gray-700">
                        Check your email for a reset link!
                    </p>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex flex-col items-center justify-center w-full  h-[70vh]   text-gray-700 min-h-[85vh]">
            <div className="w-full sm:w-1/2 shadow-lg  p-5 rounded-lg lg:rounded-l-none">
                <div className="px-8 mb-4 text-center">
                    <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                    <p className="mb-4 text-sm text-gray-700">
                        Enter your email address below to reset your password.
                    </p>
                </div>
                <form className="px-8 pt-6 pb-8 mb-4   rounded" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-6 text-center">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            disabled={false}
                        >
                            {isLoading ? 'Sending...' : 'Reset Password'}
                        </button>
                    </div>
                    <hr className="mb-6 border-t" />
                    <div className="text-center">
                        <Link to="/register" className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                            Create an Account!
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link to="/login" className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                            Already have an account? Login!
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Forget;
