import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../../axios";
import "../Register/userRegister.css";

function EditJob() {
  const token = JSON.parse(localStorage.getItem("token"));
  const profile_id = localStorage.getItem("profile_id");
  const company = JSON.parse(localStorage.getItem("CompanyProfile"));
  const userID = JSON.parse(localStorage.getItem("userId"));
  const locat = useLocation();
  const jobID = locat.state?.data;
  const [jobs, setJobs] = useState([]);
  const fetchJob = async () => {
    await axios
      .get(`view-single-job/?id=${jobID}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setJobs(res.data);
        console.log(res.data);
        setJobTitle(res.data.job_title);
        setEmployeeType(res.data.level);
        setWorkPlaceType(res.data.job_type);
        setJobDescription(res.data.full_description);
        setJobQualifications(res.data.qualification.id);
        setLocation(res.data.location);
        setJobDepartment(res.data.department.id);
        setSalaryRange(res.data.salary_range);
        setExperience(res.data.experience);
        setLastDate(res.data.last_date);
        setVacancy(res.data.vacancy);
      });
  };
  const fetchProfile = () => {
    axios
      .get(`company-profile/?id=${profile_id}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setJobCategory(res.data.category.id);
      });
  };

  const [departments, setDepartments] = useState([]);
  const fetchDepartment = async () => {
    await axios
      .get(`company-department/?id=${company.category.id}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setDepartments(res.data);
        setJobCategory(company.category.id);
        setCompanyID(company.id);
      });
  };

  useEffect(() => {
    fetchProfile();
    fetchDepartment();
    fetchJob();
  }, []);

  const navigate = useNavigate();

  const VACANCY_REGEX = /^[0-9]*$/;
  const EXPERIENCE_REGEX = /^[0-9]{1,2}$/;

  const [jobTitle, setJobTitle] = useState("");
  const [compnayID, setCompanyID] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [experience, setExperience] = useState("");
  const [workPlaceType, setWorkPlaceType] = useState("");
  const [jobDescriptions, setJobDescription] = useState("");
  const [jobQualifications, setJobQualifications] = useState("");
  const [jobDepartment, setJobDepartment] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [location, setLocation] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [vacancy, setVacancy] = useState("");

  const [error, setError] = useState(false);

  const handlejobTitle = (e) => {
    setJobTitle(e.target.value);
  };

  const handleEmployeeType = (e) => {
    setEmployeeType(e.target.value);
  };

  const handleWorkplaceType = (e) => {
    setWorkPlaceType(e.target.value);
  };

  const handleJobDescription = (e) => {
    setJobDescription(e.target.value);
  };
  const handleJobQualifications = (e) => {
    setJobQualifications(e.target.value);
  };
  const handleSalaryRange = (e) => {
    setSalaryRange(e.target.value);
  };
  const handleJoblocation = (e) => {
    setLocation(e.target.value);
  };
  const handleExperience = (e) => {
    setExperience(e.target.value);
  };
  const handleLastDate = (e) => {
    setLastDate(e.target.value);
  };
  const handleVacancy = (e) => {
    setVacancy(e.target.value);
  };
  const errorMessage = () => {
  return (
      <div
          className="error"
          style={{
              display: error ? '' : 'none',
          }}>
          <h5 className='text-red-700 text-xl'>Invalid entries</h5>
      </div>
  );
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const V1 = VACANCY_REGEX.test(vacancy);
    const V2 = EXPERIENCE_REGEX.test(experience);

    if (
      jobTitle === "" ||
      jobDepartment === "" ||
      employeeType === "" ||
      experience === "" ||
      salaryRange === "" ||
      jobQualifications === "" ||
      jobDescriptions === "" ||
      location === "" ||
      vacancy === "" ||
      lastDate === "" ||
      workPlaceType === ""
    ) {
      setError(true);
    } else if (!V1 || !V2) {
      setError(true)
    } else {
      const shortDescription = jobDescriptions.split("\n");
      let data = {
        job_title: jobTitle,
        company_id: compnayID,
        recruiter_id: userID,
        category: jobCategory,
        department: jobDepartment,
        level: employeeType,
        experience: experience,
        salary_range: salaryRange,
        job_type: workPlaceType,
        qualification: jobQualifications,
        full_description: jobDescriptions,
        short_description: shortDescription[0],
        location: location,
        vacancy: vacancy,
        last_date: lastDate,
      };
      axios
        .put(`recruiter-update-job/?id=${jobID}`, data, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        })
        .then((res) => {
          navigate("/recruiter-my-jobs");
        });
    }
  };

  return (
    <div>
      <div className="px-10 py-20 md:mx-40 lg:mx-20">
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0">
          <div className="flex flex-col p-6 rounded-md sm:p-10 xl:p-32 bg-white shadow-xl sm:max-w-2xl sm:rounded-lg my-20">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl text-myBlue font-bold">
                Edit your Job
              </h1>
              <p className="text-sm dark:text-gray-400">
                Find A Great Hire, Fast
              </p>
            </div>
            <form
              novalidate=""
              action=""
              className="space-y-12 ng-untouched ng-pristine ng-valid user-form"
              onSubmit={handleSubmit}
            >
              <div className="space-y-4">
                <div className="grid">
                  <div className="pr-2">
                    <label for="firstName" className="block mb-2 text-sm">
                      Job Title
                    </label>
                    <input
                      type="name"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter Job Title"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 text-gray-800"
                      onChange={handlejobTitle}
                      value={jobTitle}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="pr-2 col-span-2 md:col-span-1">
                    <label for="firstName" className="block mb-2 text-sm">
                      Experience Level
                    </label>
                    <select
                      name="company"
                      id="job-type"
                      className="container p-2 my-1 bg-white rounded-md border dark:border-gray-700"
                      onChange={handleEmployeeType}
                    >
                      <option>Select</option>
                      <option key="fresher" value="fresher">
                        Fresher
                      </option>
                      <option key="intermediate" value="intermediate">
                        Intermediate
                      </option>
                      <option key="professional" value="professional">
                        Professional
                      </option>
                    </select>
                  </div>

                  <div className="pl-2 col-span-2 md:col-span-1">
                    <label for="firstName" className="block mb-2 text-sm">
                      Job Type
                    </label>
                    <select
                      name="company"
                      id="job-type"
                      className="container p-2 my-1 bg-white rounded-md border dark:border-gray-700"
                      onChange={handleWorkplaceType}
                    >
                      <option>Select</option>
                      <option key="part-time" value="part-time">
                        Part Time
                      </option>
                      <option key="full-time" value="full-time">
                        Full Time
                      </option>
                      <option key="intern" value="intern">
                        Intern
                      </option>
                      <option key="work-from-home" value="work-from-home">
                        Work From Home
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <label for="lastName" className="block mb-2 text-sm">
                    Job Description
                  </label>
                  <textarea
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter Job description"
                    className="w-full px-3 py-2 border rounded-md dark:border-gray-700 text-gray-800 h-20"
                    onChange={handleJobDescription}
                    value={jobDescriptions}
                    required
                  />
                </div>
                <div>
                  <div className="grid grid-cols-2">
                    <div className="col-span-2 md:col-span-1">
                      <label for="lastName" className="block mb-2 text-sm ">
                        Minimum qualificaion
                      </label>
                      <select
                        name="company"
                        id="qualification"
                        onChange={handleJobQualifications}
                        className="p-2 my-1 rounded-md border bg-white dark:border-gray-700"
                      >
                        <option>Select</option>
                        <option key="1" value="4">
                          Masters
                        </option>
                        <option key="2" value="5">
                          Under Graducation
                        </option>
                        <option key="3" value="6">
                          Higher Secondary
                        </option>
                        <option key="4" value="7">
                          SSLC
                        </option>
                      </select>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label for="firstName" className="block mb-2 text-sm">
                        Job location
                      </label>
                      <input
                        type="name"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter Location"
                        className="w-full px-3 py-2 border rounded-md dark:border-gray-700"
                        onChange={handleJoblocation}
                        value={location}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="pr-2 col-span-3 md:col-span-1">
                    <label for="firstName" className="block mb-2 text-sm">
                      Job Department
                    </label>
                    <select
                      className="container p-2 my-1 bg-white rounded-md border dark:border-gray-700"
                      onChange={(e) => {
                        const selectedCategory = e.target.value;
                        setJobDepartment(selectedCategory);
                      }}
                    >
                      <option>Please choose one option</option>
                      {departments.map((department, index) => {
                        return (
                          <option value={department.id} key={index}>
                            {department.department_name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="px-2 col-span-3 md:col-span-1">
                    <label for="firstName" className="block mb-2 text-sm">
                      Salary Range
                    </label>
                    <input
                      type="name"
                      name="firstName"
                      id="firstName"
                      placeholder=""
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700"
                      onChange={handleSalaryRange}
                      value={salaryRange}
                      required
                    />
                  </div>
                  <div className="pl-2 col-span-3 md:col-span-1">
                    <label for="firstName" className="block mb-2 text-sm">
                      Vacancy
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder=""
                      pattern="^[0-9]*$"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700"
                      onChange={handleVacancy}
                      value={vacancy}
                    />
                    <span className="text-red-500 hidden">
                      Only numbers are accepted!
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="pl-2 col-span-2 md:col-span-1">
                    <label for="firstName" className="block mb-2 text-sm">
                      Minimum Experiecnce
                    </label>
                    <input
                      type="name"
                      name="firstName"
                      id="firstName"
                      placeholder=""
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700"
                      onChange={handleExperience}
                      value={experience}
                      pattern="^[0-9]{1,2}$"
                    />
                    <span className="text-red-500 hidden">
                      Maximun 2 numbers are accepted!
                    </span>
                  </div>
                  <div className="pl-2 col-span-2 md:col-span-1">
                    <label for="firstName" className="block mb-2 text-sm">
                      Last Date
                    </label>
                    <input
                      type="date"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter salary Range"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700"
                      onChange={handleLastDate}
                      value={lastDate}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='text-center'>
              {errorMessage()}
              </div>
              <div className="space-y-2">
                <div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3 font-semibold rounded-md dark:bg-myBlue  dark:text-white"
                  >
                    EDIT JOB
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

export default EditJob;
