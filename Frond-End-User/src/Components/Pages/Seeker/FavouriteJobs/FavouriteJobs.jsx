import React, { useEffect, useState } from "react";
import axios from "../../../../axios";
import ProfileCard from "../../../Seeker/ProfileCard/SProfileCard";
import JobCard from "../../../Cards/JobCard/JobCard";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


function FavouriteJobs() {
  const token = JSON.parse(localStorage.getItem("token"));
  const profileId = localStorage.getItem("profile_id");
  const [jobs, setJobs] = useState([]);
  const fetchJobs = () => {
    axios
      .get(`favourite-job-list/?seeker_id=${profileId}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setJobs(res.data);
      });
  };

  const [isRemoved, setIsRemoved] = useState(false)
  const RemoveFromFavourite = (jobID) => {
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
        setIsRemoved(!isRemoved)
        Swal.fire({
          icon:"success",
          title: `${res.data.message} !`,
          showConfirmButton:false,
          timer:1500
        })
      });
  };


  useEffect(() => {
    fetchJobs();
  }, [isRemoved]);


  return (
    <div className="bg-primary lg:py-20">
      <div className="capitalize text-center text-4xl font-black">
        Favourite jobs
      </div>
      <div className="grid lg:grid-cols-3">
        <ProfileCard />
        <div className="lg:m-20 sm:m-10 col-span-2 ">
            
            {jobs.length ? (<div>
                {jobs.map((job, index) => {
                return(
          <JobCard job = {job.job_id} RemoveFromFavourite = {RemoveFromFavourite} />
                )
            })}
            </div>) : (
                <div className="text-center text-2xl font-bold text-red-600 mt-20">
                NO FAVOURITED JOBS
            </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default FavouriteJobs;
