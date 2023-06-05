import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import axios from "../../../../axios";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../../../../Constants";
import ReactPaginate from "react-paginate";
import "../../../Pages/Seeker/BrowseForJobs/pagination.css"
import Avatar from "../../../../assets/avatar.webp"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function BrowseCandidates() {
  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem("token"));
  const [seekers, setSeekers] = useState([]);
  const [tempSeekers, setTempSeekers] = useState([]);
  const fetchSeekers = () => {
    axios
      .get("all-seekers-profile/", {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setSeekers(res.data);
        setTempSeekers(res.data)
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

  const experienceLevels = [
    "fresher",
    "internship",
    "intermediate",
    "professional",
  ];

  const allSeekers = () => {
    setTempSeekers(seekers);
  };

  const filterByCategory = (category) => {
    console.log(category);
    let filtered = seekers.filter(
      (seeker) => seeker.category.category_name === category
    );
    setTempSeekers(filtered);
  };

  const filterByDepartment = (department) => {
    let filtered = seekers.filter(
      (seeker) => seeker.department.department_name === department
    );
    setTempSeekers(filtered);
  };

  const filterByQualification = (qualification) => {
    let filtered = seekers.filter(
      (seeker) => seeker.qualification?.title === qualification
    );
    setTempSeekers(filtered);
  };

  const filterByExperienceLevel = (experience) => {
    let filtered = seekers.filter((seeker) => seeker.level === experience);
    setTempSeekers(filtered);
  };

  const [search, setSearch] = useState("");
  const searchData = (seeker) => {
    return search === ""
      ? seeker
      : 
          seeker.category?.category_name.toLowerCase().includes(search) ||
          seeker.department?.department_name.toLocaleLowerCase().includes(search) ||
          seeker.seeker?.first_name.toLocaleLowerCase().includes(search) ||
          seeker.level.toLowerCase().includes(search);
  };
  // const BASEURL = `http://127.0.0.1:8000${seeker.seeker_profile}`;


   // paginations

   const [currentPage, setCurrentPage] = useState(0);
   const [itemsPerPage, setItemsPerPage] = useState(10);
   const dataToRender = tempSeekers.filter(searchData).slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
 
   const handlePageChange = ({ selected }) => {
     setCurrentPage(selected);
   };


  useEffect(() => {
    fetchSeekers();
    fetchCategory();
    fetchDepartments();
    fetchQualifications();
  }, []);

  return (
    <div>
      <div>
        <div className="font-black text-center text-3xl py-10 bg-primary">
          <h1 className="text-gray-600 uppercase"> browse candidates</h1>
        </div>
        <div className="bg-gradient-to-r from-green-300 to-cyan-500">
          <div className="grid lg:grid-cols-6 xl:px-40 container mx-auto ">
            <div className="lg:col-span-2 col-span-6 px-10 ">
              <div className="shadow-xl rounded-lg my-10 px-10 py-10 bg-white bg-opacity-60">
                <div className="border-b-2 border-gray-200 text-2xl my-5 font-semibold text-gray-600 pb-5">
                  Filter
                </div>
                <div
                  className="text-gray-600 py-3 text-center hover:cursor-pointer bg-white bg-opacity-70  hover:bg-gray-200 rounded-lg"
                  onClick={allSeekers}
                >
                  All Candidates
                </div>
                <div className="text-gray-600 py-1 text-center ">
                  <Menu
                    as="div"
                    className="relative inline-block text-left w-full pb-5"
                  >
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white bg-opacity-60 px-10 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Category
                        <ChevronDownIcon
                          className="-mr-1 ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                        {categories.map((category, index) => {
                            return (
                              <Menu.Item key={index}>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                                onClick={() =>
                                  filterByCategory(category.category_name)
                                }
                              >
                                {category.category_name}
                              </a>
                            )}
                          </Menu.Item>
                            )
                          })}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="text-gray-600 py-1 text-center">
                  <Menu as="div" className="relative inline-block w-full pb-5">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white bg-opacity-60 px-12 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Department
                        <ChevronDownIcon
                          className="-mr-1 ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {departments.map((department, index) => {
                            return (
                              <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                                onClick={() =>
                                  filterByDepartment(department.department_name)
                                }
                              >
                                {department.department_name}
                              </a>
                            )}
                          </Menu.Item>
                            )
                          })}
                          
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="text-gray-600 py-1 text-center">
                  <Menu as="div" className="relative inline-block w-full pb-5">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white bg-opacity-60 px-12 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Experiene Level
                        <ChevronDownIcon
                          className="-mr-1 ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {experienceLevels.map((experience, index) => {
                            return(
                              <Menu.Item key={index}>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                                onClick={() =>
                                  filterByExperienceLevel(experience)
                                }
                              >
                                {experience}
                              </a>
                            )}
                          </Menu.Item>
                            )
                          })}
                          
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                
                {/* <div className="text-gray-600 py-1 text-center">
                  <Menu as="div" className="relative inline-block w-full pb-5">
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white bg-opacity-60 px-10 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Qualification
                        <ChevronDownIcon
                          className="-mr-1 ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {qualifications.map((qualification, index) => {
                            return(
                              <Menu.Item key={index}>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "block px-4 py-2 text-sm"
                                )}
                                onClick={() =>
                                  filterByQualification(qualification.title)
                                }
                              >
                                {qualification.title}
                              </a>
                            )}
                          </Menu.Item>
                            )
                          })}
                          
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div> */}
              </div>
            </div>
            <div className="col-span-4 px-10 py-5">
              <div className="shadow-xl my-5 rounded-lg  bg-white bg-opacity-60 px-10 py-6">
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
              {tempSeekers.length ? (
                <div>
                  {dataToRender.map((seeker, index) => {
                    return (
                      <div className="shadow-xl p-10 my-5 rounded-lg hover:shadow-2xl grid grid-cols-9 justify-between bg-white bg-opacity-60">
                        <div className="md:col-span-2 col-span-9">
                          <img
                            src={seeker.profile_photo ? `${BASEURL + seeker.profile_photo}` : Avatar}
                            className="rounded-lg w-20 h-20 object-cover"
                            alt=""
                          />
                        </div>
                        <div className="md:col-span-5 col-span-9 pr-5">
                          <h1 className="capitalize text-xl font-bold pt-3 hover:cursor-pointer" onClick={() => navigate('/candidates-profile', {
                              state: { data: seeker.id },
                            })}>
                            {seeker.department?.department_name}
                          </h1>
                          <div>
                            {seeker.seeker?.first_name} &nbsp; &nbsp; {seeker.seeker?.last_name}
                          </div>
                          <div className="flex pt-3">
                            <p className="mr-5 text-gray-600">
                              <i class="fa-solid fa-user-tie"></i>{" "}
                              &nbsp;{seeker.level}
                            </p>
                            <p className="text-gray-600">
                              <i class="fa-thin fa-briefcase"></i> &nbsp;6 Years
                              {seeker.experience}
                            </p>
                          </div>
                        </div>
                        <div className="md:col-span-2 col-span-9 flex flex-col">
                          {/* <button className="bg-myGreen hover:bg-green-500 text-white px-7 py-2 rounded-md" onClick={() => }>
                            Email
                          </button> */}
                          <span className="mt-5"><a href={`mailto: ${seeker.seeker.email}`} target='_blank' className="bg-myGreen hover:bg-green-500 text-white px-7 py-2 rounded-md">Email</a></span>
                          <p className="text-center pt-3 italic text-gray-600">
                            Open to work{" "}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <ReactPaginate
                        pageCount={Math.ceil(
                          tempSeekers.filter(searchData).length / itemsPerPage
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
                  Sorry , No Canidates available
                </h1>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrowseCandidates;
