import React, { useContext, useEffect, useState } from "react";
import axios from "../../../axios";
import BellIcon from "../../../assets/notification.png";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import AuthContext from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { WsURL } from "../../../Constants";

function Notifications() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const navigate = useNavigate()

  const [notifications, setNotificatins] = useState([]);

  const fetchNotifications = async () => {
    await axios
      .get(`notifications/?user_id=${userId}`)
      .then((res) => {
        setNotificatins(res.data);
      });
  };

  const {setIsReaded, isReaded} = useContext(AuthContext)
  const UpdateNotification = async () => {
    await axios.patch(`notifications-update-view/?user_id=${userId}`,{
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    }).then((res) => {
      setIsReaded(!isReaded)
    })
  }

  const showDateTime = (dateandtime) => {
    const datetime = new Date(dateandtime);
    const date = datetime.toLocaleDateString();
    const time = datetime.toLocaleTimeString();

    return(
      <div>
        {date} &nbsp; &nbsp; &nbsp;&nbsp; {time}
      </div>
    )
  };


  useEffect(() => { 
    UpdateNotification()
    fetchNotifications();

  }, []);

  return (
    <div>
      <div className="">
        <div className="font-black text-center text-3xl py-10 bg-primary">
          <h1 className="text-gray-600 uppercase">Notifications</h1>
        </div>
        <div className="bg-gradient-to-r from-green-300 to-cyan-500 pt-20">
          <div className="container flex justify-center mx-auto">
            <div className="px-10 py-5">
              {/* <div className="shadow-xl my-5 rounded-lg bg-opacity-50  bg-white px-10 py-6">
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
                      // onChange={(e) => {
                      //   let searchValue = e.target.value.toLocaleLowerCase();
                      //   setSearch(searchValue);
                      // }}
                    />
                  </div>
                </form>
              </div> */}
              {!notifications.length ? (
                <div>
                  <h1 className="text-center text-red-600 text-xl font-bold mt-10 bg-white bg-opacity-20 py-20 rounded-lg">
                    Sorry , No Notifications available
                  </h1>
                </div>
              ) : (
                <div>
                  {notifications.map((notification, index) => {
                    return (
                      <div key={index}>
                        <div className="shadow-xl p-10 my-5 rounded-lg hover:shadow-2xl grid grid-cols-9 justify-between bg-opacity-50 bg-white">
                          <div className="col-span-2">
                            <img
                              src={BellIcon}
                              className="rounded-lg lg:w-20 lg:h-20 h-12 w-12 object-cover"
                              alt=""
                            />
                          </div>
                          <div className="col-span-5 pr-5 hover:cursor-pointer">
                            <h1 className="capitalize text-xl font-bold pt-3" onClick={() => {
                              if(notification.parameter){
                                navigate(notification.url, {state: {data: notification.parameter}})
                              }
                              else{
                                navigate(notification.url)
                              }
                            }}>
                              {notification.title}
                            </h1>
                            <div className="flex pt-3"></div>
                            <div className="py-3">
                              <p className=" text-gray-800">
                                {/* {job.short_description} */}
                                {notification.notification}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-2 flex flex-col items-center">
                            <div className="my-5">
                              {showDateTime(notification.created_at)}
            
                            </div>
                            <p className="text-center pt-3 italic text-gray-600">
                              {/* Last Date : {job.last_date}{" "} */}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
