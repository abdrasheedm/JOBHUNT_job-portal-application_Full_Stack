// import React, { useState, useEffect } from "react";
// import axios from "../../../axios";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import "../Register/userRegister.css";

// function RecruiterRegister() {
//   const NAME_REGEX = /^[A-Za-z]{3,16}$/;
//   const COMPAMY_REGEX = /^[A-Za-z]{3,50}$/;
//   const EMAIL_REGEXT =
//     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//   const PHONE_NUMBER_REGEX =
//     /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
//   const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

//   const [categories, setCategory] = useState([]);
//   const fetchCategory = async () => {
//     await axios.get(`company-category/`).then((res) => {
//       setCategory(res.data);
//     });
//   };
//   useEffect(() => {
//     fetchCategory();
//   }, []);

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [company, setCompany] = useState("");
//   const [companyCategory, setCompanyCategory] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState('');

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleFirstName = (e) => {
//     setFirstName(e.target.value);
//     setSubmitted(false);
//   };

//   const handleLastName = (e) => {
//     setLastName(e.target.value);
//     setSubmitted(false);
//   };

//   const handleCompany = (e) => {
//     setCompany(e.target.value);
//     setSubmitted(false);
//   };

//   const handleMobile = (e) => {
//     setMobile(e.target.value);
//     setSubmitted(false);
//   };

//   const handleEmail = (e) => {
//     setEmail(e.target.value);
//     setSubmitted(false);
//   };

//   // Handling the password change
//   const handlePassword = (e) => {
//     setPassword(e.target.value);
//     setSubmitted(false);
//   };

//   const handleConfirmPassword = (e) => {
//     setConfirmPassword(e.target.value);
//     setSubmitted(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const V1 = NAME_REGEX.test(firstName);
//     const V2 = NAME_REGEX.test(lastName);
//     const V3 = EMAIL_REGEXT.test(email);
//     const V4 = PHONE_NUMBER_REGEX.test(mobile);
//     const V5 = PASSWORD_REGEX.test(password);
//     const V6 = COMPAMY_REGEX.test(company);

//     if (
//       firstName === "" ||
//       lastName === "" ||
//       company === "" ||
//       email === "" ||
//       mobile === "" ||
//       password === "" ||
//       password != confirmPassword ||
//       !V1 ||
//       !V2 ||
//       !V3 ||
//       !V4 ||
//       !V5 ||
//       !V6 
//     ) {
//       setError("Please Enter all Fields");
//     } else {
//       axios
//         .post("user/signup/", {
//           first_name: firstName,
//           last_name: lastName,
//           company_name: company,
//           company_category: companyCategory,
//           phone_number: mobile,
//           email: email,
//           user_type: "Recruiter",
//           password: password,
//         })
//         .then((res) => {
//           if (res.data.otp) {
//             dispatch({
//               type: "mobile",
//               payload: mobile,
//             });
//             navigate("/verify-otp");
//           }
//         }).catch((error) => {
//           console.log(error.response.data)
//           setError(error.response.data)
//         })
//     }
//   };

//   // Showing error message if error is true
//   const errorMessage = () => {
//     return (
//       <div
//         className="error"
//         style={{
//           display: error ? "" : "none",
//         }}
//       >
//         <h5 className="text-red-700 text-xl">{error}</h5>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <div>
//         <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
//           <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-2xl sm:rounded-lg">
//             <div className="py-10">
//               <a href="/">
//                 <h3 className="text-4xl font-bold text-center">Sign Up</h3>
//               </a>
//             </div>
//             <form className="px-5 pb-10 user-form" onSubmit={handleSubmit}>
//               <div>
//                 <label
//                   htmlFor="first_name"
//                   className="block text-lg font-medium text-gray-700 undefined"
//                 >
//                   First Name
//                 </label>
//                 <div className="flex flex-col items-start">
//                   <input
//                     type="text"
//                     name="first_name"
//                     onChange={handleFirstName}
//                     value={firstName}
//                     pattern="^[A-Za-z]{3,16}$"
//                     className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-200 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   />
//                   <span className="">
//                     First Name should be 3-16 characters and shouldn't include
//                     any special character or number!
//                   </span>
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="last_name"
//                   className="block text-lg font-medium text-gray-700 undefined"
//                 >
//                   Last Name
//                 </label>
//                 <div className="flex flex-col items-start">
//                   <input
//                     type="text"
//                     name="last_name"
//                     onChange={handleLastName}
//                     value={lastName}
//                     pattern="^[A-Za-z]{3,16}$"
//                     className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   />
//                   <span className="text-red-500 hidden">
//                     Last Name should be 3-16 characters and shouldn't include
//                     any special character or number!
//                   </span>
//                 </div>
//               </div>
//               <div>
//                 <label
//                   htmlFor="company_name"
//                   className="block text-lg font-medium text-gray-700 undefined"
//                 >
//                   Company Name
//                 </label>
//                 <div className="flex flex-col items-start">
//                   <input
//                     type="text"
//                     name="company_name"
//                     onChange={handleCompany}
//                     value={company}
//                     pattern="^[A-Za-z]{3,50}$"
//                     className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   />
//                   <span className="text-red-500 hidden">
//                     Comapny Name should be 3-50 characters and shouldn't include
//                     any special character or number!
//                   </span>
//                 </div>
//               </div>
//               <div>
//                 <label
//                   htmlFor="company_name"
//                   className="block text-lg font-medium text-gray-700 undefined"
//                 >
//                   Company Category
//                 </label>
//                 <div className="flex flex-col items-start">
//                   <select
//                     className="container p-2 my-1 rounded-md"
//                     onChange={(e) => {
//                       const selectedCategory = e.target.value;
//                       setCompanyCategory(selectedCategory);
//                     }}
//                   >
//                     <option>Please choose one option</option>
//                     {categories.map((category, index) => {
//                       return (
//                         <option value={category.category_name} key={index}>
//                           {category.category_name}
//                         </option>
//                       );
//                     })}
//                   </select>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <label
//                   htmlFor="email"
//                   className="block text-lg font-medium text-gray-700 undefined"
//                 >
//                   Email
//                 </label>
//                 <div className="flex flex-col items-start">
//                   <input
//                     type="email"
//                     name="email"
//                     onChange={handleEmail}
//                     value={email}
//                     pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
//                     className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   />
//                   <span className="text-red-500 hidden">Invalid Email !</span>
//                 </div>
//               </div>
//               <div>
//                 <label
//                   htmlFor="last_name"
//                   className="block text-lg font-medium text-gray-700 undefined"
//                 >
//                   Phone Number
//                 </label>
//                 <div className="flex flex-col items-start">
//                   <input
//                     type="number"
//                     name="phone_number"
//                     onChange={handleMobile}
//                     pattern="^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
//                     value={mobile}
//                     className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   />
//                   <span className="text-red-500 hidden">
//                     Mobil should have 10 numbers and no characters !
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <label
//                   htmlFor="password"
//                   className="block text-lg h-10 font-medium text-gray-700 undefined"
//                 >
//                   Password
//                 </label>
//                 <div className="flex flex-col items-start">
//                   <input
//                     type="password"
//                     name="password"
//                     onChange={handlePassword}
//                     value={password}
//                     pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
//                     className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   />
//                   <span className="text-red-500 hidden">
//                     password should have minimum 8 characters, at least one
//                     letter and one number!
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <label
//                   htmlFor="password"
//                   className="block text-lg h-10 font-medium text-gray-700 undefined"
//                 >
//                   Confirm Password
//                 </label>
//                 <div className="flex flex-col items-start">
//                   <input
//                     type="password"
//                     name="password"
//                     onChange={handleConfirmPassword}
//                     value={confirmPassword}
//                     pattern={password}
//                     className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   />
//                   <span className="text-red-500 hidden">
//                     Password not match !
//                   </span>
//                 </div>
//               </div>
//               {/* <div className="mt-4">
//                 <label
//                   htmlFor="password_confirmation"
//                   className="block text-lg h-10 font-medium text-gray-700 undefined"
//                 >
//                   Confirm Password
//                 </label>
//                 <div className="flex flex-col items-start">
//                   <input
//                     type="password"
//                     name="password_confirmation"
//                     className="block w-full mt-1 h-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   />
//                 </div>
//               </div> */}
//               <div className="text-center py-10">{errorMessage()}</div>
//               <div className="flex items-center justify-end mt-4">
//                 <Link
//                   to="/signin"
//                   className="text-sm text-gray-600 underline hover:text-gray-900"
//                   href="#"
//                 >
//                   Already registered?
//                 </Link>
//                 <button
//                   type="submit"
//                   className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-myBlue border border-transparent rounded-md active:bg-gray-900 false"
//                 >
//                   Register
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RecruiterRegister;
