import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../../../axios";
import "./userRegister.css";

function UserRegister() {
  const NAME_REGEX = /^[A-Za-z]{3,16}$/;
  const EMAIL_REGEXT =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const PHONE_NUMBER_REGEX =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const COMPAMY_REGEX = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{3,50}$/;


  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [mobile, setMobile] = useState("");

  const [email, setEmail] = useState("");

  const [company, setCompany] = useState("");

  const [companyCategory, setCompanyCategory] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [userType, setUserType] = useState("JobSeeker");
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [categories, setCategory] = useState([]);
  const fetchCategory = async () => {
    await axios.get(`company-category/`).then((res) => {
      setCategory(res.data);
    });
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleFirstName = (e) => {
    //    (false);
    //   if(!/^[A-Za-z]{3,16}$/i.test(e.target.value)){
    //     setFnameError(true)
    // }
    // else{
    //   setFnameError(false)
    // }
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
     (false);
  };

  const handleMobile = (e) => {
    setMobile(e.target.value);
     (false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
     (false);
  };

  const handleCompany = (e) => {
    setCompany(e.target.value);
     (false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
     (false);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const V1 = NAME_REGEX.test(firstName);
    const V2 = NAME_REGEX.test(lastName);
    const V3 = EMAIL_REGEXT.test(email);
    const V4 = PHONE_NUMBER_REGEX.test(mobile);
    const V5 = PASSWORD_REGEX.test(password);
    const V6 = COMPAMY_REGEX.test(company);

      if(userType==="JobSeeker"){
        if (
          firstName === "" ||
          lastName === "" ||
          email === "" ||
          mobile === "" ||
          password === "" ||
          !V1 ||
          !V2 ||
          !V3 ||
          !V4 ||
          !V5 ||
          password != confirmPassword
        ) {
          setError("Please fill all fields");
        }
        else{
          axios
        .post("user/signup/", {
          first_name: firstName,
          last_name: lastName,
          phone_number: mobile,
          email: email,
          user_type: userType,
          password: password,
        })
        .then((res) => {
          if (res.data.otp) {
            dispatch({
              type: "mobile",
              payload: mobile,
            });
            navigate("/verify-otp");
          }
        });
        }
        
      }else{
        if (
          firstName === "" ||
          lastName === "" ||
          email === "" ||
          mobile === "" ||
          password === "" ||
          !V1 ||
          !V2 ||
          !V3 ||
          !V4 ||
          !V5 ||
          !V6 ||
          password != confirmPassword
        ) {
          setError("Please fill all fields");
        }
        else{
          axios
        .post("user/signup/", {
          first_name: firstName,
          last_name: lastName,
          company_name: company,
          company_category: companyCategory,
          phone_number: mobile,
          email: email,
          user_type: userType,
          password: password,
        })
        .then((res) => {
          if (res.data.otp) {
            dispatch({
              type: "mobile",
              payload: mobile,
            });
            navigate("/verify-otp");
          }
        });
        }
        
      }
  
    
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h5 className="text-red-700 text-xl">{error}</h5>
      </div>
    );
  };
  return (
    <div>
      <div>
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
          <div className="flex flex-col p-6 rounded-md sm:p-10 lg:p-32 bg-white shadow-md w-1/2 sm:max-w-2xl sm:rounded-lg my-20">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl text-myBlue font-bold">Sign up</h1>
              <p className="text-sm dark:text-gray-400">
                Sign in to access your account
              </p>
            </div>
            <div className="grid grid-cols-2">
            <div className={userType==="JobSeeker" ? "text-center py-4 font-bold text-xl border-t-8 border-myBlue text-myBlue" : "text-center py-4 font-bold text-xl border-t-8 border-gray-400 text-gray-400 "} onClick={()=>setUserType("JobSeeker")}>
              <span className="hover:cursor-pointer">Job Seeker</span>
            </div>
            <div className={userType==="Recruiter" ? "text-center py-4 font-bold text-xl border-t-8 border-myBlue text-myBlue " : "text-center py-4 font-bold text-xl border-t-8 border-gray-400 text-gray-400 "} onClick={()=> setUserType("Recruiter")}>
              <span className="hover:cursor-pointer">Employer</span>
            </div>
            </div>
            <form
              noValidate=""
              action=""
              className="space-y-12 ng-untouched ng-pristine ng-valid user-form"
              onSubmit={handleSubmit}
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="block mb-2 text-sm">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    placeholder="Enter Your First Name"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    onChange={handleFirstName}
                    value={firstName}
                    pattern="^[A-Za-z]{3,16}$"
                  />
                  <span className="">
                    First Name should be 3-16 characters and shouldn't include
                    any special character or number!
                  </span>
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-2 text-sm">
                    Last Name
                  </label>
                  <input
                    type="name"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter Your Last Name"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    onChange={handleLastName}
                    value={lastName}
                    pattern="^[A-Za-z]{3,16}$"
                  />
                  <span className="text-red-500 hidden">
                    Last Name should be 3-16 characters and shouldn't include
                    any special character or number!
                  </span>
                </div>
                {userType==="Recruiter" && (<div>
                  <div>
                  <label htmlFor="lastName" className="block mb-2 text-sm">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder="Enter Your Company Name"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    onChange={handleCompany}
                    value={company}
                    pattern="^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{3,50}$"
                  />
                  <span className="text-red-500 hidden">
                    Comapny Name should be 3-50 characters!
                  </span>
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-2 text-sm">
                    Company Category
                  </label>
                  <div className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900">
                    <select className="container p-2 my-1 rounded-md"
                    onChange={(e) => {
                      const selectedCategory = e.target.value;
                      setCompanyCategory(selectedCategory);
                    }}>
                      <option className="">Please Choose one option</option>
                      {categories.map((category, index) => {
                      return (
                        <option className="" value={category.category_name} key={index}>
                          {category.category_name}
                        </option>
                      );
                    })}
                    </select>
                  </div>
                </div>
                </div>)}
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
                    pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                  />
                  <span className="text-red-500 hidden">Invalid Email !</span>
                </div>
                <div>
                  <label htmlFor="number" className="block mb-2 text-sm">
                    PhoneNumber
                  </label>
                  <input
                    type="tel"
                    name="telphone"
                    placeholder="888 888 8888"
                    maxLength="10"
                    title="Ten digits code"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    onChange={handleMobile}
                    value={mobile}
                    pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
                  />
                  <span className="text-red-500 hidden">
                    Mobil should have 10 numbers and no characters!
                  </span>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm">
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="*****"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    onChange={handlePassword}
                    value={password}
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                  />
                  <span className="text-red-500 hidden">
                    password should have minimum 8 characters, at least one
                    letter and one number!
                  </span>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm">
                      Confirm Password
                    </label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="*****"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                    onChange={handleConfirmPassword}
                    value={confirmPassword}
                    pattern={password}
                  />
                  <span className="text-red-500 hidden">
                    password not match !
                  </span>
                </div>
              </div>
              <div>
                <div className="text-center">{errorMessage()}</div>
              </div>
              <div className="space-y-2">
                <div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3 font-semibold rounded-md dark:bg-myBlue  dark:text-white"
                  >
                    Sign up
                  </button>
                </div>
                <p className="px-6 text-sm text-center dark:text-gray-400">
                  Already registered ?
                  <Link
                    rel="noopener noreferrer"
                    to="/signin"
                    className="hover:underline text-myBlue"
                  >
                    Sign in
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
