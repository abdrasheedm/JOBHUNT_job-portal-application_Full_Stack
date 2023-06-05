import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "../../../axios"

function SingleJobView() {

    const locat = useLocation()
    const jobID = locat.state?.data
    const token = JSON.parse(localStorage.getItem("token"));
    const [jobData, setJobData] = useState({})


    const fetchJobDetails = async () => {
        await axios
        .get(`view-single-job/?id=${jobID}`, {
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        }).then((res) => {
            setJobData(res.data)
        })
    }

    useEffect(() => {
        fetchJobDetails()
    }, [])


  return (
    <div style={{
      backgroundImage: `url("https://wallpaperaccess.com/full/1410260.jpg")`,
      backgroundSize: "cover",
    }}>
      <div className="">
        <div className="font-bold text-center text-3xl py-10 bg-white">
          <h1 className="text-gray-600 uppercase">{jobData.job_title}</h1>
        </div>
        <div className="grid lg:grid-cols-6 xl:px-40 container mx-auto">
          <div className="col-span-4 px-10 py-5 shadow-xl my-10 rounded-lg  bg-primary bg-opacity-60">
            <div className="my-10 px-10 py-5 border-b-2 border-gray-200">
              <h1 className="text-2xl my-5 font-semibold text-gray-600">{jobData.job_title}</h1>
              <div className="flex justify-between">
                <h1 className="">{jobData.location}</h1>
                <h1 className="">{jobData.job_type}</h1>
              </div>
            </div>
            <div>
              <div className="my-10 px-10 py-5">
                <h1 className="text-xl font-semibold my-5">Job Description</h1>
                <p className="text-gray-700 tracking-wide leading-7">
                &ensp;&ensp;&ensp;{jobData.full_description}
                </p>
              </div>
              <div className="my-10 px-10 py-5">
                <h1 className="text-xl font-semibold my-5">Minimum Qualification</h1>
                <p className="text-gray-700 tracking-wide leading-7">
                    Applicant should have atleast &nbsp;
                  <span className="font-semibold">{jobData.qualification?.title}</span> qualification.
                </p>
              </div>
              <div className="my-10 px-10 py-5">
                <h1 className="text-xl font-semibold my-5">Category</h1>
                <p className="text-gray-700 tracking-wide leading-7">
                    This Job is under the 
                    <span className="font-semibold">{jobData.category?.category_name}</span> category
                </p>
              </div>
              <div className="my-10 px-10 py-5">
                <h1 className="text-xl font-semibold my-5">Department</h1>
                <p className="text-gray-700 tracking-wide leading-7">
                  This job comes under <span className="font-semibold">{jobData.department?.department_name}</span> Department
                </p>
              </div>
              <div className="my-10 px-10 py-5">
                <h1 className="text-xl font-semibold my-5">Employee Level</h1>
                <p className="text-gray-700 tracking-wide leading-7">
                <span className="font-semibold">{jobData.level}</span> 
                  level employees are accepeted
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 col-span-6 px-10 ">
            <div className="shadow-xl rounded-lg my-10 px-10 py-10  bg-slate-50 bg-opacity-60">
                <div className="border-b-2 border-gray-200 text-2xl my-5 font-semibold text-gray-600 pb-5">Job Summary</div>
                <div className="text-gray-600 py-1">published on : <span className="text-gray-900 font-semibold">{jobData.created_at}</span></div>
                <div className="text-gray-600 py-1">vacancy: <span className="text-gray-900 font-semibold">{jobData.vacancy}</span></div>
                <div className="text-gray-600 py-1">salary range : <span className="text-gray-900 font-semibold">{jobData.salary_range}</span></div>
                <div className="text-gray-600 py-1">Location : <span className="text-gray-900 font-semibold">{jobData.location}</span></div>
                <div className="text-gray-600 py-1">Job Nature : <span className="text-gray-900 font-semibold">{jobData.job_type}</span></div>

            </div>
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default SingleJobView;
