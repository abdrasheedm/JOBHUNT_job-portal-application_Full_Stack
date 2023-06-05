import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import { BASEURL } from "../../../Constants";

function SProfileCard({seekerID}) {
  const profile_id = seekerID ? seekerID : localStorage.getItem("profile_id");
  const token = JSON.parse(localStorage.getItem("token"));

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
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  const navigate = useNavigate();
  return (
    <div className="sm:m-10 lg:my-20 xl:m-20">
      <div
        className="bg-white rounded-2xl drop-shadow-2xl lg:p-10 sm:p-5 mb-5 hover:shadow-2xl"
        onClick={() => {
          if(seekerID){
            return
          }
          navigate("/seeker-profile");
        }}
      >
        <div className="flex justify-center pt-5">
          {profile.profile_photo ? (
            <img
              className="h-40 w-40 rounded-full"
              src={`${BASEURL+profile.profile_photo}`}
              alt=""
            />
          ) : (
            <div className="text-red-600">Add Profile Photo</div>
          )}
        </div>
        <div className="flex flex-col items-center m-3 p-5">
          <h1 className="text-xl font-bold m-3 uppercase">
            {profile.seeker?.first_name}
          </h1>
          <h1 className="text-sm font-semibold m-3 uppercase">
            {profile.department?.department_name}
          </h1>
          <p className="text-center">{profile.about}</p>
        </div>
        <div>
        </div>
      </div>
      {/* <div className="bg-white rounded-2xl drop-shadow-2xl lg:p-5 sm:p-5 flex flex-col justify-center">
        <div className="py-5">
          <h1 className="text-center py-5 text-2xl font-bold">SKILLS</h1>
        </div>
        <div className="bg-gray-100 mx-10 p-5 rounded-lg shadow-md">
          <h1>
            Skill Name
          </h1>
          <h2>
            department
          </h2>
          <h2>
            level
          </h2>
        </div>
      </div> */}
      {seekerID ? "" : (<div className="bg-white rounded-2xl drop-shadow-2xl lg:p-5 sm:p-5 flex flex-col justify-center mb-10">
        <button
          className="bg-myGreen text-white lg:text-2xl font-bold px-16 py-3 rounded-lg mb-5 capitalize"
          onClick={() => {
            navigate('/seeker-favourite-jobs');
          }}
        >
          MY FAVOURITE JOBS
        </button>
        <button className="bg-myGreen text-white lg:text-2xl font-bold px-16 py-3 rounded-lg mb-5 capitalize" onClick={() => {
          navigate('/seeker-applied-jobs')
        }}>
          APPLIED JOBS
        </button>
        {/* <button className="bg-myGreen text-white lg:text-2xl font-bold px-16 py-3 rounded-lg mb-5">
          FAVOURITE COMPANIES
        </button> */}
      </div>)}
    </div>
  );
}

export default SProfileCard;
