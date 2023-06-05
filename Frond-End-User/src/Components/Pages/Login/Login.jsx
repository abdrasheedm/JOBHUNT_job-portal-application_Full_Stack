import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../axios";
import AuthContext from "../../../Context/AuthContext";

function Login() {
  const { Userlogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const { errorMsg, SetErrorMsg } = useContext(AuthContext);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    // setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    // setSubmitted(false);
  };

  // const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      SetErrorMsg("Please Enter All the fields");
    } else {
      Userlogin(email, password);
      // axios.post('user/signin/', {
      // email: email,
      // password: password
      // }).then((res) => {
      // if(res.data.is_login){
      // localStorage.setItem("token", res.data.token.access)
      // navigate('/')

      // }

      // })

      // // setSubmitted(true);
      // // setError(false);
    }
  };
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div className="error" style={{ display: errorMsg ? "" : "none" }}>
        <h5 className="text-red-700 text-xl">{errorMsg}</h5>
      </div>
    );
  };

  return (
    <div>
      <div>
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
          <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white shadow-md sm:max-w-2xl sm:rounded-lg">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl text-myBlue font-bold">Sign in</h1>
              <p className="text-sm dark:text-gray-400">
                Sign in to access your account
              </p>
            </div>
            <form
              noValidate=""
              action=""
              className="space-y-12 ng-untouched ng-pristine ng-valid"
              onSubmit={handleSubmit}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    onChange={handleEmail}
                    value={email}
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm">
                      Password
                    </label>
                    <Link
                      rel="noopener noreferrer"
                      to="/forgot-password"
                      className="text-xs hover:underline dark:text-gray-400"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="*****"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    onChange={handlePassword}
                    value={password}
                  />
                </div>
              </div>
          <div className="text-center">{errorMessage()}</div>

              <div className="space-y-2">
                <div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3 font-semibold rounded-md dark:bg-myBlue  dark:text-white"
                  >
                    Sign in
                  </button>
                </div>
                <p className="px-6 text-sm text-center dark:text-gray-400">
                  Don't have an account yet?
                  <Link
                    rel="noopener noreferrer"
                    to="/user-register"
                    className="hover:underline text-myBlue"
                  >
                    Sign up
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
          {/* <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-2xl sm:rounded-lg">
        <div className="py-10">
          <a href="/">
            <h3 className="text-4xl font-bold text-center">Sign In</h3>
          </a>
        </div>
        <form className="px-5 pb-10" onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 undefined">
              Email
            </label>
            <div className="flex flex-col items-start">
              <input type="email" name="email" onChange={handleEmail} value={email}
                className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-red-900 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="block text-lg h-10 font-medium text-gray-700 undefined">
              Password
            </label>
            <div className="flex flex-col items-start">
              <input type="password" name="password" onChange={handlePassword} value={password}
                className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
            </div>
          </div>
          <div className='text-center py-10'>
            {errorMessage()}
          </div>

          <div className="flex items-center justify-end mt-4">
            <Link to='/user-register' className="text-sm text-gray-600 underline hover:text-gray-900">
            Not registered?
            </Link>
            <button type="submit"
              className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-myBlue border border-transparent rounded-md active:bg-gray-900 false">
              Sign in
            </button>
          </div>
        </form>
      </div> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
