import React from "react";
import axios from "../../../axios";
import ProfileCard from "../../Recruiter/ProfileCard/ProfileCard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

function MyJobs() {
  const token = JSON.parse(localStorage.getItem("token"));
  const company = JSON.parse(localStorage.getItem("CompanyProfile"));
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    await axios
      .get(`recruiter-view-job/?id=${company.id}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setJobs(res.data);
      });
  };

  const [applidJobs, setAppliedJobs] = useState([])
  const fetchAppliedJobs = () => {
    axios
    .get(`applied-jobs/?recruiter_id=${company.id}`, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    })
    .then((res) => {
      let response = res.data;
      var AppliedjobIds = [];
      response.map((job) => {
        AppliedjobIds = [...AppliedjobIds, job.job_id.id];
      });
      setAppliedJobs(AppliedjobIds);
    });
  }


  const [isDeleted, setIsDeleted] = useState(false)
  const handleDeleteJob = (jobId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
      .get(`recruiter-delete-job/?id=${jobId}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setIsDeleted(!isDeleted)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      });
        
      }
    })
    
  };
  useEffect(() => {
    fetchJobs();
    fetchAppliedJobs()
  }, [isDeleted]);



  return (
    <div className="">
      <div className="grid lg:grid-cols-3">
        <ProfileCard />
        <div className="col-span-2 ">
          <div className="px-10 py-20 lg:mx-10">
            <div className="">
              <button
                className="bg-myBlue text-white text-lg px-8 py-1 rounded-lg my-5"
                onClick={() => {
                  navigate("/recruiter-post-job");
                }}
              >
                POST A JOB
              </button>
            </div>
            <div>
              <div className="p-5 rounded-md shadow-lg">
                {jobs.length ? (
                  <div>
                    <h1 className="text-xl mb-2">MY JOBS</h1>

                    <div className="overflow-auto rounded-lg shadow hidden md:block">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b-2 border-gray-200">
                          <tr>
                            <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                              No.
                            </th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">
                              Job Title
                            </th>
                            <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                              Status
                            </th>
                            <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                              Posted Date
                            </th>
                            <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                              Applied
                            </th>
                            <th className="w-28 p-3 text-sm font-semibold tracking-wide text-left"></th>
                            <th className="w-28 p-3 text-sm font-semibold tracking-wide text-left"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {jobs.map((job, index) => {
                            return (
                              <tr className="bg-white">
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                  <a
                                    href="#"
                                    className="font-bold text-blue-500 hover:underline"
                                  >
                                    {index + 1}
                                  </a>
                                </td>
                                <td
                                  className="p-3 text-sm text-gray-700 whitespace-nowrap hover:cursor-pointer hover:text-myBlue"
                                  onClick={() => {
                                    navigate("/recruiter-single-job-view", {
                                      state: { data: job.id },
                                    });
                                  }}
                                >
                                  {job.job_title}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                  <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                                    Active
                                  </span>
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                  {job.created_at}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                  {applidJobs.includes(job.id) ? (
                                    <div className="text-myBlue font-bold text-lg hover:cursor-pointer" onClick={() => navigate('/application-tracking', {state:{data:job.id, title:job.job_title}})}>
                                      
                                     {applidJobs.filter((id)=>(id === job.id)).length}
                                    </div>
                                  ) : <div className="text-myBlue font-bold text-lg">0</div>}

                                </td>
                                <td className="p-2 text-sm text-green-700 whitespace-nowrap">
                                  <i
                                    className="fas fa-edit"
                                    onClick={() => {
                                      const value = job.id;
                                      navigate("/recruiter-edit-job", {
                                        state: { data: value },
                                      });
                                    }}
                                  ></i>
                                </td>
                                <td className="p-2 text-sm text-red-700 whitespace-nowrap">
                                  <i
                                    class="fa-solid fa-trash"
                                    onClick={() => {
                                      handleDeleteJob(job.id);
                                    }}
                                  ></i>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                      {jobs.map((job, index) => {
                        return (
                          <div className="bg-white space-y-3 p-4 rounded-lg shadow">
                            <div className="flex items-center space-x-2 text-sm">
                              <div>
                                <a
                                  href="#"
                                  className="text-blue-500 font-bold hover:underline"
                                >
                                  #{index + 1}
                                </a>
                              </div>
                              <div className="text-gray-500">
                                {job.created_at}
                              </div>
                              <div>
                                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                                  Delivered
                                </span>
                              </div>
                            </div>
                            <div className="text-sm text-gray-700">
                              {job.job_title}
                            </div>
                            <div className="text-sm font-medium text-black">
                            {applidJobs.includes(job.id) ? (
                                    <div className="text-myBlue font-bold text-lg">
                                      
                                     {applidJobs.filter((id)=>(id === job.id)).length}
                                    </div>
                                  ) : <div className="text-myBlue font-bold text-lg">0</div>}
                            </div>
                            <div className="text-green-700 text-right">
                              {" "}
                              <i
                                className="fas fa-edit"
                                onClick={() => {
                                  var value = job.id;
                                  navigate("/recruiter-edit-job", {
                                    state: { data: value },
                                  });
                                }}
                              ></i>
                            </div>
                            <div className="text-red-700 text-right">
                              <i
                                class="fa-solid fa-trash"
                                onClick={() => {
                                  handleDeleteJob(job.id);
                                }}
                              ></i>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <h1 className="text-red-700 font-bold text-2xl">NO JOBS</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyJobs;
