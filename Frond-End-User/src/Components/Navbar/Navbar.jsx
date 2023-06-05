import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import JobHuntLogo from "../../assets/JobHuntLogo.png";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import axios from "../../axios";
import { BASEURL } from "../../Constants";
import { toast, Toaster } from "react-hot-toast";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { data } from "autoprefixer";
import { WsURL } from "../../Constants";

const userNav = [
  { name: "HOME", href: "/", current: true },
  { name: "BROWSE JOBS ", href: "/seeker-browse-jobs", current: false },
  // { name: "PAGE", href: "#", current: false },
  // { name: "MESSAGING", href: "#", current: false },
  // { name: "CONTACT", href: "#", current: false },
];
const recruiterNav = [
  {
    name: "BROWSE CANDIDATES ",
    href: "/recruiter-browse-candidates",
    current: false,
  },
  { name: "PAGE", href: "#", current: false },
  // { name: "MESSAGING", href: "#", current: false },
  // { name: "CONTACT", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const { logOut, user } = useContext(AuthContext);
  const userType = JSON.parse(localStorage.getItem("userType"));

  const token = JSON.parse(localStorage.getItem("token"));
  const profile_id = localStorage.getItem("profile_id");
  const userId = localStorage.getItem("userId");
  const [profileImage, setProfileImage] = useState("");
  const fetchSeekerProfile = () => {
    axios
      .get(`seeker-profile/?id=${profile_id}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setProfileImage(res.data.profile_photo);
      });
  };

  const fetchRecruiterProfile = () => {
    axios
      .get(`company-profile/?id=${profile_id}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setProfileImage(res.data.company_logo);
      });
  };

  const IMGURL = `${BASEURL + profileImage}`;

  const navigate = useNavigate();
  const [unread, setUnread] = useState("");
  const {isReaded} = useContext(AuthContext)
  useEffect(() => {
    if (userType === "Recruiter") {
      fetchRecruiterProfile();
    } else if (userType === "JobSeeker") {
      fetchSeekerProfile();
    }
  }, [profileImage]);
  if(token){
  const client = new W3CWebSocket(`${WsURL}${userId}/`);
    useEffect(() => {
      client.onopen = () => {
      };
      client.onmessage = (message) => {
        console.log("connected to web socket");
        const dataFromServer = JSON.parse(message.data);
        setUnread(dataFromServer.count);
        toast.success(dataFromServer.notification);
      };
    }, [])
  }

  
  useEffect(() => {
    if (userId) {
      axios
        .get(`notifications-count-view/?user_id=${userId}`, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        })
        .then((res) => {
          setUnread(res.data.count);
        });
      
    }
  }, [isReaded]);
  return (
    <div>
      <Disclosure as="nav" className="bg-primary py-10">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 md:flex md:justify-center">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-10 w-auto lg:hidden"
                      src={JobHuntLogo}
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-20 w-auto lg:block"
                      src={JobHuntLogo}
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block pt-5">
                    <div className="flex space-x-4">
                      {userType === "Recruiter"
                        ? recruiterNav.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                item.href === window.location.pathname
                                  ? "bg-gradient-to-r from-blue-800 to-indigo-900 text-white"
                                  : "text-gray-900 hover:bg-blue-900 hover:text-white",
                                "px-3 py-2 rounded-md text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          ))
                        : userNav.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                item.href === window.location.pathname
                                  ? "bg-gradient-to-r bg-myBlue text-white"
                                  : "text-gray-900 hover:bg-blue-900 hover:text-white",
                                "px-3 py-2 rounded-md text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          ))}
                    </div>
                  </div>
                  {user ? (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      <div className="relative">
                        <div
                          style={{ borderRadius: "50%" }}
                          className="w-5 left-6 text-center bg-red-600 text-white absolute"
                        >
                          <span className="text-sm">{unread}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <BellIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                          onClick={() => navigate("/notifications")}
                        />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={IMGURL}
                              alt=""
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
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <>
                                  {userType === "Recruiter" ? (
                                    <Link
                                      to="/recruiter-profile"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      )}
                                    >
                                      Your Profile
                                    </Link>
                                  ) : (
                                    <Link
                                      to="/seeker-profile"
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                      )}
                                    >
                                      Your Profile
                                    </Link>
                                  )}
                                </>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  onClick={logOut}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Sign out
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="mt-4">
                    {user ? (
                      ""
                    ) : (
                      <button
                        className="bg-myBlue text-white font-medium py-2 px-8 rounded-xl lg:mx-2 "
                        onClick={() => {
                          navigate("/signin");
                        }}
                      >
                        SIGN IN
                      </button>
                    )}
                    {user ? (
                      ""
                    ) : (
                      <button
                        className="bg-myGreen text-white font-medium py-2 px-8 rounded-xl md:mx-5 mx-2"
                        onClick={() => {
                          navigate("/user-register");
                        }}
                      >
                        SIGN UP
                      </button>
                    )}
                    {/* <button className='bg-myGreen text-white font-medium py-2 px-8 rounded-xl mx-5 ' onClick={logOut}>logout</button> */}
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {userType === "Recruiter"
                  ? recruiterNav.map((item) => (
                      <Link
                        key={item.name}
                        as="a"
                        to={item.href}
                        className={classNames(
                          item.href === window.location.pathname
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block px-3 py-2 rounded-md text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))
                  : userNav.map((item) => (
                      <Link
                        key={item.name}
                        as="a"
                        to={item.href}
                        className={classNames(
                          item.href === window.location.pathname
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block px-3 py-2 rounded-md text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
      </div>
    </div>
  );
}

export default Navbar;
