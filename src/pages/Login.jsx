import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await logIn(email, password);
      navigate('/');
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <>
      <div className="w-full sm:h-[800px] min-h-screen relative">
        <img
          className="hidden sm:block absolute w-full h-full object-cover brightness-50"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/b321426e-35ae-4661-b899-d63bca17648a/4eb4e01e-2723-438e-bf4a-a17a19760663/ID-en-20220926-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
        />
        <div className="absolute sm:flex sm:items-center w-full h-full px-4 pt-12 sm:py-24">
          <div className="w-full max-w-[450px] sm:min-h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto pt-16 sm:py-16">
              <h1 className="text-4xl font-bold">Sign In</h1>
              {error ? <p className="p-3 bg-red-400 mt-3">{error}</p> : null}
              <form
                onSubmit={onSubmitHandler}
                className="w-full flex flex-col py-6"
              >
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                />
                <button className="bg-red-600 py-3 my-6 rounded font-bold">
                  Sign In
                </button>
                <div className="flex justify-between items-center text-sm text-gray-300">
                  <p className="flex">
                    <input
                      className="mr-2 border border-white"
                      type="checkbox"
                    />
                    Remember me
                  </p>
                  <p className="hover:underline cursor-pointer">Need Help?</p>
                </div>
                <p className="py-6">
                  <span className="text-gray-600 mr-1">New to Netflix?</span>{' '}
                  <Link className="hover:underline" to="/signup">
                    Sign Up Now
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
