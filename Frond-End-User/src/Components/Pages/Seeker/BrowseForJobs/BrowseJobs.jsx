import React, { useEffect, useState } from "react";
import axios from "../../../../axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import "./pagination.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function BrowseJobs() {
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;
  const profileId = localStorage.getItem("profile_id")
    ? localStorage.getItem("profile_id")
    : null;
  const [jobs, setJobs] = useState([]);
  const [tempJobs, setTempJobs] = useState([]);
  const fetchJobs = () => {
    axios.get("browse-job/").then((res) => {
      setJobs(res.data);
      setTempJobs(res.data);
    });
  };

  const [FavouritedJobIDs, setFavouriteJobIDs] = useState();
  const [favourited, setFavourited] = useState(false);
  const fetchFavouritedJobIDs = () => {
    axios
      .get(`seeker-favourited-job/?id=${profileId}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        let response = res.data;
        var job_id = [];
        response.map((job) => {
          job_id = [...job_id, job.job_id];
        });
        setFavouriteJobIDs(job_id);
      });
  };
  const navigate = useNavigate();

  const AddAndRemoveFavourite = (jobID) => {
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not logged in!",
        confirmButtonText: "Signin",
      }).then(() => {
        navigate("/signin");
      });
      return;
    }
    let data = {
      job_id: jobID,
      seeker_id: profileId,
    };
    axios
      .post(`favourite-job/?seeker_id=${profileId}&job_id=${jobID}`, data, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setFavourited(!favourited);
        Swal.fire({
          icon: "success",
          title: `${res.data.message} !`,
          showConfirmButton: false,
        });
      });
  };

  const [categories, setCategory] = useState([]);
  const fetchCategory = async () => {
    await axios.get(`company-category/`).then((res) => {
      setCategory(res.data);
    });
  };

  const [departments, setDepartments] = useState([]);
  const fetchDepartments = async () => {
    await axios.get(`company-department/`).then((res) => {
      setDepartments(res.data);
    });
  };

  const [qualifications, setQualifications] = useState([]);
  const fetchQualifications = async () => {
    await axios.get(`job-qualifications-view/`).then((res) => {
      setQualifications(res.data);
    });
  };

  const jobTypes = ["part-time", "full-time", "intern"];
  const experienceLevels = [
    "fresher",
    "internship",
    "intermediate",
    "professional",
  ];

  const allJobs = () => {
    setTempJobs(jobs);
  };

  const filterByCategory = (category) => {
    let filtered = jobs.filter(
      (job) => job.category.category_name === category
    );
    setTempJobs(filtered);
  };

  const filterByDepartment = (department) => {
    let filtered = jobs.filter(
      (job) => job.department.department_name === department
    );
    setTempJobs(filtered);
  };

  const filterByJobType = (jobType) => {
    let filtered = jobs.filter((job) => job.job_type === jobType);
    setTempJobs(filtered);
  };

  const filterByQualification = (qualification) => {
    let filtered = jobs.filter(
      (job) => job.qualification.title === qualification
    );
    setTempJobs(filtered);
  };

  const filterByExperienceLevel = (experience) => {
    let filtered = jobs.filter((job) => job.level === experience);
    setTempJobs(filtered);
  };

  const [search, setSearch] = useState("");
  const searchData = (job) => {
    return search === ""
      ? job
      : job.job_title.toLowerCase().includes(search) ||
          job.category.category_name.toLowerCase().includes(search) ||
          job.department.department_name.toLocaleLowerCase().includes(search) ||
          job.level.toLowerCase().includes(search);
  };

  // paginations

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const dataToRender = tempJobs
    .filter(searchData)
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const [showFilter, setShowFilter] = useState(true)
  const handlShowFilter = () => {
    setShowFilter(!showFilter)
  }

  useEffect(() => {
    if (token) {
      fetchFavouritedJobIDs();
    }
  }, [favourited]);

  useEffect(() => {
    fetchJobs();
    fetchCategory();
    fetchDepartments();
    fetchQualifications();
  }, []);

  return (
    <div>
      <div className="">
        <div className="font-black text-center text-3xl py-10 bg-primary">
          <h1 className="text-gray-600 uppercase"> browse Jobs</h1>
        </div>
        <div
          className="bg-gradient-to-r from-green-300 to-cyan-500"
          // style={{
          //   backgroundImage: `url("https://wallpaperaccess.com/full/1410260.jpg")`,
          //   backgroundSize: "cover",
          // }}
        >
          <div className="grid lg:grid-cols-6 xl:px-40 container mx-auto ">
            <div className="lg:col-span-2 col-span-6 px-10">
              <div className="shadow-xl rounded-lg my-10 px-10 py-10 bg-white">
                <div className="border-b-2 border-gray-200 text-2xl my-5 font-semibold text-gray-600 pb-5" onClick={handlShowFilter}>
                  Filter
                   <div className="text-sm font-thin text-end">{showFilter ? <i className="fa-solid fa-up-right-from-square"></i> : <i class="fa-solid fa-rectangle-xmark"></i> }</div>
                </div>
                <div className="" hidden={showFilter}>
                <div
                  className="text-gray-600 py-3 text-center hover:cursor-pointer hover:bg-gray-200 rounded-lg"
                  onClick={allJobs}
                >
                  All Jobs
                </div>
                <div className="text-gray-600 py-1 text-center ">
                  <select
                    class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    onChange={(e) => filterByCategory(e.target.value)}
                  >
                    <option value="" className="text-center">
                      Category
                    </option>
                    {categories.map((category, index) => {
                      return (
                        <option value={category.category_name}>
                          {category.category_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="text-gray-600 py-1 text-center">
                  <select
                    class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    onChange={(e) => filterByDepartment(e.target.value)}
                  >
                    <option value="" className="text-center">
                      Department
                    </option>
                    {departments.map((department, index) => {
                      return (
                        <option value={department.department_name}>
                          {department.department_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="text-gray-600 py-1 text-center">
                  <select
                    class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    onChange={(e) => filterByJobType(e.target.value)}
                  >
                    <option value="" className="text-center">
                      Job Tyoe
                    </option>
                    {jobTypes.map((job_type, index) => {
                      return <option value={job_type}>{job_type}</option>;
                    })}
                  </select>
                </div>
                <div className="text-gray-600 py-1 text-center">
                  <select
                    class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    onChange={(e) => filterByQualification(e.target.value)}
                  >
                    <option value="" className="text-center">
                      Qualification
                    </option>
                    {qualifications.map((qualification, index) => {
                      return (
                        <option value={qualification.title}>
                          {qualification.title}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="text-gray-600 py-1 text-center">
                  <select
                    class="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                    onChange={(e) => filterByExperienceLevel(e.target.value)}
                  >
                    <option value="" className="text-center">
                      Experience Level
                    </option>
                    {experienceLevels.map((experience, index) => {
                      return <option value={experience}>{experience}</option>;
                    })}
                  </select>
                </div>
                </div>

              </div>
            </div>
            <div className="col-span-4 px-10 py-5">
              <div className="shadow-xl my-5 rounded-lg  bg-white px-10 py-6">
                <form className="max-w-xl px-4">
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                      onChange={(e) => {
                        let searchValue = e.target.value.toLocaleLowerCase();
                        setSearch(searchValue);
                      }}
                    />
                  </div>
                </form>
              </div>
              {!tempJobs.length ? (
                <div>
                  <h1 className="text-center text-red-600 text-xl font-bold mt-10 bg-white bg-opacity-20 py-20 rounded-lg">
                    Sorry , No Jobs available
                  </h1>
                </div>
              ) : (
                <div>
                  {tempJobs.filter(searchData).length ? (
                    <div>
                      {dataToRender.map((job, index) => {
                        return (
                          <div
                            className="shadow-xl p-10 my-5 rounded-lg hover:shadow-2xl grid grid-cols-9 justify-between bg-white"
                            key={index}
                          >
                            <div className="md:col-span-2 col-span-9">
                              <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzRCgx-jrMQUQENdxiV71ZtID09zMRz3hnew&usqp=CAU"
                                className="rounded-lg w-20 h-20 object-cover"
                                alt=""
                              />
                            </div>
                            <div
                              className="md:col-span-5 col-span-9 pr-5 hover:cursor-pointer"
                              onClick={() =>
                                navigate("/seeker-single-job-view", {
                                  state: { data: job.id },
                                })
                              }
                            >
                              <h1 className="capitalize text-xl font-bold pt-3">
                                {job.job_title}{" "}
                              </h1>
                              <div className="flex pt-3">
                                <p className="mr-5 text-gray-600">
                                  <i className="fa-solid fa-user-tie"></i>{" "}
                                  &nbsp;
                                  {job.category?.category_name}{" "}
                                </p>
                                <p className="text-gray-600">
                                  <i className="fa-thin fa-briefcase"></i>{" "}
                                  &nbsp; {job.salary_range}{" "}
                                </p>
                              </div>
                              <div className="py-3">
                                <p className="italic text-gray-400 max-h-40 overflow-hidden">
                                  {job.full_description}
                                </p>
                              </div>
                            </div>
                            <div className="md:col-span-2 col-span-9 flex flex-col items-center">
                              <div className="my-5">
                                <span
                                  className={
                                    FavouritedJobIDs?.includes(job.id)
                                      ? "text-white bg-myGreen p-2 rounded bg-opacity-90 hover:bg-myGreen hover:bg-opacity-100 mt-4"
                                      : "bg-green-100 p-2 rounded bg-opacity-60 text-myGreen hover:text-white hover:bg-myGreen"
                                  }
                                  onClick={() => {
                                    AddAndRemoveFavourite(job.id);
                                  }}
                                >
                                  <i className="fa-regular fa-2xl fa-heart"></i>
                                </span>
                              </div>
                              <button
                                className="bg-myGreen hover:bg-green-500 text-white px-7 py-2 rounded-md"
                                onClick={() =>
                                  navigate("/seeker-single-job-view", {
                                    state: { data: job.id },
                                  })
                                }
                              >
                                Apply Now
                              </button>
                              <p className="text-center pt-3 italic text-gray-600">
                                Last Date : {job.last_date}{" "}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <ReactPaginate
                        pageCount={Math.ceil(
                          tempJobs.filter(searchData).length / itemsPerPage
                        )}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName="pagination"
                        activeClassName="active"
                        previousLabel="Previous"
                        nextLabel="Next"
                        pageLinkClassName="page-link"
                        previousLinkClassName="page-link"
                        nextLinkClassName="page-link"
                        disabledClassName="disabled"
                      />
                    </div>
                  ) : (
                    <div>
                      <h1 className="text-center text-red-600 text-xl font-bold mt-10 bg-white bg-opacity-20 py-20 rounded-lg">
                        Sorry , No Searches available
                      </h1>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseJobs;
