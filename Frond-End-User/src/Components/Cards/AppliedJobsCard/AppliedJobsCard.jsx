import axios from '../../../axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function AppliedJobsCard({job, isRemoved}) {
    const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem("token"));
  const userID = localStorage.getItem('profile_id')

    const RemoveAppliedJob = (jobID) => {
        axios.get(`remove-applied-job/?job_id=${jobID}&user_id=${userID}`,{
            headers: {
                Authorization : `Bearer ${token.access}`
            }
        }).then((res) => {

        isRemoved()

        Swal.fire({
          icon:"success",
          title: `${res.data.message} !`,
          showConfirmButton:false,
          timer:1500
        })

        })
    }
  return (
    <div className="shadow-xl p-10 my-5 rounded-lg hover:shadow-2xl grid grid-cols-9 justify-between bg-white">
      <div className="col-span-2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzRCgx-jrMQUQENdxiV71ZtID09zMRz3hnew&usqp=CAU"
          className="rounded-lg w-20 h-20 object-cover"
          alt=""
        />
      </div>
      <div
        className="col-span-5 pr-5 hover:cursor-pointer"
        onClick={() =>
          navigate("/seeker-single-job-view", {
            state: { data: job.id },
          })
        }
      >
        <h1 className="capitalize text-xl font-bold pt-3">{job.job_title} </h1>
        <div className="flex pt-3">
          <p className="mr-5 text-gray-600">
            <i class="fa-solid fa-user-tie"></i> &nbsp;
            {job.category?.category_name}{" "}
          </p>
          <p className="text-gray-600">
            <i class="fa-thin fa-briefcase"></i> &nbsp; {job.salary_range}{" "}
          </p>
        </div>
        <div className="py-3">
          <p className="italic text-gray-400">{job.short_description}</p>
        </div>
      </div>
      <div className="col-span-2 flex flex-col items-center">
        {/* <div className="my-5">
          <span
            className={
              FavouritedJobIDs.includes(job.id)
                ? "text-white bg-myGreen p-2 rounded bg-opacity-90 hover:bg-myGreen hover:bg-opacity-100 mt-4"
                : "bg-green-100 p-2 rounded bg-opacity-60 text-myGreen hover:text-white hover:bg-myGreen"
            }
            onClick={() => {
              FavouritedJobIDs.includes(job.id)
                ? RemoveFromFavourite(job.id)
                : AddToFavourite(job.id);
            }}
          >
            <i class="fa-regular fa-2xl fa-heart"></i>
          </span>
        </div> */}
        <button
          className="bg-myGreen hover:bg-green-500 text-white px-7 py-2 rounded-md"
          onClick={() =>
            RemoveAppliedJob(job.id)
          }
        >
          Remove
        </button>
        <p className="text-center pt-3 italic text-gray-600">
          Last Date : {job.last_date}{" "}
        </p>
      </div>
    </div>
  )
}

export default AppliedJobsCard