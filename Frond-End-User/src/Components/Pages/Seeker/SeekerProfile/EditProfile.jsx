import React, { useState, useEffect } from "react";
import ProfileCard from "../../../Seeker/ProfileCard/SProfileCard";
import axios from "../../../../axios";
import { useNavigate } from "react-router-dom";

function EditSProfile() {

  const navigate = useNavigate()
  const profile_id = localStorage.getItem("profile_id");
  const token = JSON.parse(localStorage.getItem("token"));

    const [categories, setCategories] = useState([]);
    const fetchCategory = async () => {
      await axios.get(`company-category/`).then((res) => {
        setCategories(res.data);
      });
    };

    const [departments, setDepartments] = useState([]);
    const fetchDepartments = async () => {
      await axios.get(`company-department/?id=${category}`).then((res) => {
        setDepartments(res.data);
      });
    };

    const [profile, setProfile] = useState([]);
    const fetchProfile = () => {
      axios
        .get(`seeker-profile/?id=${profile_id}`, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        })
        .then((res) => {
          setProfile(res.data);
          setFirstName(res.data.seeker.first_name);
          setLastName(res.data.seeker.last_name);
          setMobile(res.data.seeker.phone_number);
          setEmail(res.data.seeker.email);
          setAbout(res.data.about);
          setlevel(res.data.level);
          setYearExperience(res.data.year_of_experience);
          setDOB(res.data.date_of_birth);
          setCity(res.data.city);
          setState(res.data.state);
          setCountry(res.data.country);
          setProfilePic(res.data.profile_photo);
          setCategory(res.data.category.id);
          setDepartment(res.data.department.id);
        });
    };
   
 


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [departmentName, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [level, setlevel] = useState("");
  const [YearExperience, setYearExperience] = useState("");
  const [dob, setDOB] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [profilePic, setProfilePic] = useState([]);

  const BASEURL = `http://127.0.0.1:8000${profilePic}`;

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleMobile = (e) => {
    setMobile(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleExperienceYear = (e) => {
    setYearExperience(e.target.value);
  };
  const handleCategory = (e) => {
      const selectedCategory = e.target.value;
      setCategory(selectedCategory)
    
  };
  const handleAbout = (e) => {
    setAbout(e.target.value);
  };
  const handleLevel = (e) => {
    setlevel(e.target.value);
  };
  const handleDob = (e) => {
    setDOB(e.target.value);
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  const handleState = (e) => {
    setState(e.target.value);
  };  const handleCountry = (e) => {
    setCountry(e.target.value);
  };
  const handleLogo = (e) => {
    // setLogo(e.target.logo.files[0]);
  };


  const profileUpdate = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone_number", mobile);
    formData.append("category", category);
    formData.append("department", departmentName);
    formData.append("about", about);
    formData.append("level", level);
    formData.append("year_of_experience", YearExperience);
    formData.append("date_of_birth", dob);
    formData.append("city", city);
    formData.append("profile_photo", e.target.logo.files[0]);
    formData.append("state", state);
    formData.append("country", country);

    let url = `/update-seeker-profile/?id=${profile_id}`;
    axios
      .put(url, formData, {
        headers: {
          Authorization: `Bearer ${token.access}`,
          // 'content-type': 'multipart/form-data'
        },
      })
      .then((res) => {
        navigate('/seeker-profile')
      });
  };

  useEffect(() => {
    fetchProfile();
    fetchCategory();
    // fetchDepartments();
  }, []);

  useEffect(() => {
    fetchDepartments()
  }, [category])

  return (
    <div className=" lg:py-20">
      <div className="grid lg:grid-cols-3">
        <ProfileCard />
        <div className="lg:m-20 sm:m-10 col-span-2 ">
          <div className="bg-white p-16 rounded-2xl drop-shadow-2xl mb-5">
            <h1 className="text-center font-bold text-3xl">Edit Profile</h1>
            <form
              novalidate=""
              action=""
              className="space-y-12 ng-untouched ng-pristine ng-valid"
              onSubmit={profileUpdate}
            >
              <div className="my-5">
                {/* <h1 className="text-xl text-myBlue text-center mb-5">
                  Personal Details
                </h1> */}
                <div className="grid grid-cols-2 mb-5">
                  <div className="col-span-2 md:col-span-1 px-5">
                    <label for="firstName" className="block mb-2 text-sm">
                      First Name
                    </label>
                    <input
                      type="name"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter Your First Name"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100"
                      onChange={handleFirstName}
                      value={firstName}
                      required
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 px-5">
                    <label for="LastName" className="block mb-2 text-sm">
                      Last Name
                    </label>
                    <input
                      type="name"
                      name="lastName"
                      id="lastName"
                      placeholder="Enter Your Last Name"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                      onChange={handleLastName}
                      value={lastName}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="col-span-2 md:col-span-1 px-5">
                    <label for="email" className="block mb-2 text-sm">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                      onChange={handleEmail}
                      value={email}
                      required
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1 px-5">
                    <label for="number" className="block mb-2 text-sm">
                      PhoneNumber
                    </label>
                    <input
                      type="tel"
                      name="telphone"
                      placeholder="888 888 8888"
                      pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                      maxlength="10"
                      title="Ten digits code"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                      onChange={handleMobile}
                      value={mobile}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="my-5">
                <div className="grid grid-cols-2 mb-5">
                  
                  <div className="col-span-2 md:col-span-1 px-5">
                    <label for="LastName" className="block mb-2 text-sm">
                      Category
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100"
                        onChange={handleCategory}
                    >
                      <option>category</option>
                      {categories.map((categry, index) => {
                        return (
                          <option value={categry.id} key={index} selected={categry.id===category ? true : false}>
                            {categry.category_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-span-2 md:col-span-1 px-5">
                    <label for="firstName" className="block mb-2 text-sm">
                      Department Name
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100"
                        onChange={(e) => {
                          const selectedDepartment = e.target.value;
                          setDepartment(selectedDepartment);
                        }}
                    >
                      <option>Department</option>
                      {departments.map((department, index) => {
                        return (
                          <option value={department.id} key={index} selected={department.id===departmentName ? true : false}>
                            {department.department_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="">
                  <div className="px-5 mb-5">
                    <label for="about" className="block mb-2 text-sm">
                      About
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Write about you"
                      className="w-full px-3 h-20 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                      onChange={handleAbout}
                      value={about}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-3 mb-5">
                    <div className="col-span-3 md:col-span-1 px-5">
                      <label for="firstName" className="block mb-2 text-sm">
                        Level
                      </label>
                      <input
                        type="name"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter Your Level"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                        onChange={handleLevel}
                        value={level}
                        required
                      />
                    </div>
                    <div className="col-span-3 md:col-span-1 px-5">
                    <label for="LastName" className="block mb-2 text-sm">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter date of birth"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                        onChange={handleDob}
                        value={dob}
                        required
                      />
                    </div>
                    <div className="col-span-3 md:col-span-1 px-5">
                      <label for="firstName" className="block mb-2 text-sm">
                        Year of Experience
                      </label>
                      <input
                        type="name"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter Your Experience"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                        onChange={handleExperienceYear}
                        value={YearExperience}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 mb-5">
                    <div className="col-span-1 mx-5">
                      <label for="firstName" className="block mb-2 text-sm">
                        City
                      </label>
                      <input
                        type="name"
                        name="firstName"
                        id="firstName"
                        placeholder="Your City"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                        onChange={handleCity}
                        value={city}
                        required
                      />
                    </div>
                    <div className="col-span-1 mx-5">
                      <label for="firstName" className="block mb-2 text-sm">
                        State
                      </label>
                      <input
                        type="name"
                        name="firstName"
                        id="firstName"
                        placeholder="Your State"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                        onChange={handleState}
                        value={state}
                        required
                      />
                    </div>
                    <div className="col-span-1 mx-5">
                      <label for="firstName" className="block mb-2 text-sm">
                        Country
                      </label>
                      <input
                        type="name"
                        name="firstName"
                        id="firstName"
                        placeholder="Your Country"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                        onChange={handleCountry}
                        value={country}
                        required
                      />
                    </div>
                    
                  </div>
                  <div className="grid grid-cols-2 mb-5">
                  <div className="col-span-1 mx-5">
                      <label for="LastName" className="block mb-2 text-sm">
                      Profile Pic
                      </label>
                      <img src={BASEURL} alt="" className="h-20 my-3" />

                      <input
                        type="file"
                        name="logo"
                        id="lastName"
                        placeholder="Enter Your Last Name"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                        // onChange={}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-myBlue border border-transparent rounded-md active:bg-gray-900 false"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditSProfile;
