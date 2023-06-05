import React, { useEffect, useState } from "react";
import JobCard from "../../../Cards/JobCard/JobCard";
import ProfileCard from "../../../Seeker/ProfileCard/SProfileCard";
import axios from "../../../../axios";
import AppliedJobsCard from "../../../Cards/AppliedJobsCard/AppliedJobsCard";

function AppliedJobs() {
  const token = JSON.parse(localStorage.getItem("token"));
  const profileId = localStorage.getItem("profile_id");

  const [isRemoved, setIsRemoved] = useState(false)
  const toggleIsRemoved = () => {
    setIsRemoved(!isRemoved)
  }
  const [jobs, setJobs] = useState([]);
  const fetchJobs = () => {
    axios
      .get(`applied-jobs/?seeker_id=${profileId}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setJobs(res.data);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, [isRemoved]);

  return (
    <div className="bg-primary lg:py-20">
      <div className="capitalize text-center text-4xl font-black">
        Applied jobs
      </div>
      <div className="grid lg:grid-cols-3">
        <ProfileCard />
        <div className="lg:m-20 sm:m-10 col-span-2 ">
        {jobs.length ? (<div>
                {jobs.map((job, index) => {
                return(
          <AppliedJobsCard job = {job.job_id} isRemoved={toggleIsRemoved}/>
                )
            })}
            </div>) : (
                <div className="text-center text-2xl font-bold text-red-600 mt-20">
                NO APPLIED JOBS
            </div>
            )}
          
        </div>
      </div>
    </div>
  );
}

export default AppliedJobs;
