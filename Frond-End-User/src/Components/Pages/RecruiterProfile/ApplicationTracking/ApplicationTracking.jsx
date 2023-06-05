import React from "react";
import axios from "../../../../axios";
import ProfileCard from "../../../Recruiter/ProfileCard/ProfileCard";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";


function ApplicationTracking() {
  const token = JSON.parse(localStorage.getItem("token"));
  const locat = useLocation();
  const jobID = locat.state?.data;
  const jobtitle = locat.state?.title;
    const profileId = JSON.parse(localStorage.getItem("profile_id"));
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const fetchApplication = async () => {
    await axios
      .get(`applicaion-tracking/?job_id=${jobID}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setApplicants(res.data);
      });
  };

  //   const [applidJobs, setAppliedJobs] = useState([]);
    const shortlistCandidate = (id) => {
      axios
        .post(`applicant-shortlist/`, {"applied_job":id, "recruiter_id":profileId},{
          headers: {
            Authorization: `Bearer ${token.access}`,
          },
        })
        .then((res) => {
          if(res.data.message==='Already shortlisted'){
            Swal.fire({
              icon: "error",
              title: `${res.data.message} !`,
              showConfirmButton: false,
              timer: 1000
             
            });
          }else{
            Swal.fire({
              icon: "success",
              title: `${res.data.message} !`,
              showConfirmButton: false,
              timer: 1000

             
            });
          }
          
        })
    };

  useEffect(() => {
    fetchApplication();
  }, []);

  //   function refreshPage() {
  //     window.location.reload(false);
  //   }

  //   const handleDeleteJob = (jobId) => {
  //     axios
  //       .get(`recruiter-delete-job/?id=${jobId}`, {
  //         headers: {
  //           Authorization: `Bearer ${token.access}`,
  //         },
  //       })
  //       .then((res) => {
  //         refreshPage();
  //       });
  //   };


  return (
    <div className="">
      <div className="grid lg:grid-cols-3">
        <ProfileCard />
        <div className="col-span-2 ">
          <div className="px-10 py-20 lg:mx-10">
            <h1 className="text-3xl font-bold text-center text-gray-600 py-10">
              Application Tracking{" "}
              <span className="text-black capitalize">{jobtitle}</span>{" "}
            </h1>
            <div className="overflow-auto rounded-lg shadow">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                      No.
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Name
                    </th>
                    <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                      Resume
                    </th>
                    <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                      Applied Date
                    </th>
                    <th className="w-28 p-3 text-sm font-semibold tracking-wide text-left">
                      Add to shortlist
                    </th>
                    <th className="w-28 p-3 text-sm font-semibold tracking-wide text-left">
                      Decline
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {applicants.map((applicant, index) => {
                    return (
                      <tr className="bg-white">
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <a
                            href="#"
                            className="font-bold text-blue-500 hover:underline"
                          >
                            {index+1}
                          </a>
                        </td>
                        <td
                          className="p-3 text-sm text-gray-700 whitespace-nowrap hover:cursor-pointer hover:text-myBlue"
                          onClick={() => {
                            navigate("/candidates-profile", {
                              state: { data: applicant.seeker_id?.id },
                            });
                          }}
                        >
                          {applicant.first_name}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <a className="text-myGreen bg-gray-100 py-1 px-1 rounded-xl" href={`http://127.0.0.1:8000/${applicant.resume}`} target='_blank'>Resume</a>

                        </td>
                        <td
                          className="p-3 text-sm text-gray-700 whitespace-nowrap hover:cursor-pointer"
                        >
                          {applicant.applied_on}
                        </td>

                        <td className="p-2 text-sm text-green-700 whitespace-nowrap text-center">
                        <i class="fa-solid fa-user-plus" onClick={() => {shortlistCandidate(applicant.id)}}></i>
                        </td>
                        <td className="p-2 text-sm text-red-700 whitespace-nowrap text-center">
                          <i
                            class="fa-solid fa-trash"
                            //   onClick={() => {
                            //     handleDeleteJob(job.id);
                            //   }}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationTracking;
