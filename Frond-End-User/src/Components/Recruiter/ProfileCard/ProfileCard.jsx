import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import { BASEURL } from "../../../Constants";


function ProfileCard({CompId}) {
  const profile_id = CompId ? CompId : localStorage.getItem("profile_id");
  const token = JSON.parse(localStorage.getItem("token"))


  const [profile, setProfile] = useState([]);
  const fetchProfile = () => {
    axios.get(`company-profile/?id=${profile_id}`, {
      headers: {
        Authorization: `Bearer ${token.access}`
      }
    }).then((res) => {
      setProfile(res.data);
    });
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  const navigate = useNavigate()
  return (
    <div className="sm:m-10 lg:my-20 xl:m-20">
      <div className="bg-white rounded-2xl drop-shadow-2xl lg:p-10 sm:p-5 mb-5 hover:shadow-2xl" onClick={() => {if(!CompId){navigate('/recruiter-profile')}}}>
      <div className="flex justify-center">
          {profile.company_logo ? (
            <img
              className="h-40 w-40 rounded-full"
              src={`${BASEURL+profile.company_logo}`}
              alt=""
            />
          ) : (
            <div className="text-red-600">Add Profile Photo</div>
          )}
        </div>
        <div className="flex flex-col items-center m-3">
          <h1 className="text-xl font-bold m-3 uppercase">
            {profile.company_name}
          </h1>
          <h1 className="text-sm font-semibold m-3 uppercase">
            {profile.category?.category_name}
          </h1>
          <p className="text-center">{profile.about}</p>
        </div>
      </div>
      {CompId ? "" : (
        <div className="bg-white rounded-2xl drop-shadow-2xl lg:p-5 sm:p-5 flex flex-col justify-center">
        <button className="bg-myGreen text-white text-2xl font-bold px-16 py-3 rounded-lg mb-5" onClick={() => {navigate('/recruiter-my-jobs')}}>
          MY JOBS
        </button>
        <button className="bg-myGreen text-white text-2xl font-bold px-16 py-3 rounded-lg mb-5" onClick={() => {navigate('/shortlisted-candidates')}}>
          SHORTLISTED CANDIDATES
        </button>
        <button className="bg-myGreen text-white text-2xl font-bold px-16 py-3 rounded-lg mb-5" onClick={() => {navigate('/recruiter-plan-details')}}>
          PLAN DETAILS
        </button>
      </div>
      )}
    </div>
  );
}

export default ProfileCard;
