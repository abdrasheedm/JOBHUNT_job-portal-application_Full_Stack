import React from "react";
import axios from "../../../../axios";
import ProfileCard from "../../../Recruiter/ProfileCard/ProfileCard";
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";


function ShortlistedCandidates() {
  const token = JSON.parse(localStorage.getItem("token"));
//   const locat = useLocation();
//   const jobID = locat.state?.data;
//   const jobtitle = locat.state?.title;
    const profileId = JSON.parse(localStorage.getItem("profile_id"));
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const fetchShortlisted = async () => {
    await axios
      .get(`shortlisted-applicant/?recruiter_id=${profileId}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setApplicants(res.data);
      });
  };

//   //   const [applidJobs, setAppliedJobs] = useState([]);
//     const shortlistCandidate = (id) => {
//       axios
//         .post(`applicant-shortlist/`, {"applied_job":id},{
//           headers: {
//             Authorization: `Bearer ${token.access}`,
//           },
//         })
//         .then((res) => {
//         })
//     };
const [isDeleted, setIsDeleted] = useState(false)
const handelRemoveCandidate = (id) => {
  axios
    .get(`delete-shortlisted-applicant/?applicant_id=${id}`, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    })
    .then((res) => {
        setIsDeleted(!isDeleted)
        Swal.fire({
            icon: "success",
            title: `${res.data.message} !`,
            showConfirmButton: false,
            timer: 1000
           
          });
    });
};

  useEffect(() => {
    fetchShortlisted();
  }, [isDeleted]);




  return (
    <div className="">
      <div className="grid lg:grid-cols-3">
        <ProfileCard />
        <div className="col-span-2 ">
          <div className="px-10 py-20 lg:mx-10">
            <h1 className="text-3xl font-bold text-center text-gray-600 py-10">
              Shortlisted Candidates
            </h1>
            <div className="overflow-auto rounded-lg shadow hidden md:block">
              {applicants.length ? (<table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="w-52 p-3 text-sm font-semibold tracking-wide text-left">
                      Name
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Job Title
                    </th>
                    <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                      status
                    </th>
                    <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                      Contact
                    </th>
                    <th className="w-28 p-3 text-sm font-semibold tracking-wide text-left">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {applicants.map((applicant, index) => {
                    return (
                      <tr className="bg-white">
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          <div
                            className="font-bold text-blue-500 hover:underline flex"
                            onClick={() => {
                                navigate("/candidates-profile", {
                                  state: { data: applicant.applied_job?.seeker_id?.id },
                                });
                              }}>
                                <img className="rounded-full h-12 w-12 mx-2" src={`http://127.0.0.1:8000/${applicant.applied_job?.seeker_id?.profile_photo}`} alt="" />
                           {applicant.applied_job?.first_name}
                          </div>
                        </td>
                        <td
                          className="p-3 text-sm text-gray-700 whitespace-nowrap hover:cursor-pointer hover:text-myBlue"
                          
                        >
                          {applicant.applied_job?.job_id?.job_title}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {applicant.status}

                        </td>
                        <td
                          className="p-3 text-sm text-gray-700 whitespace-nowrap hover:cursor-pointer"
                        >
                            <a href={`mailto: ${applicant.applied_job.email}`} target='_blank' className="text-myGreen bg-gray-100 p-1 rounded-lg">Email</a>
                        </td>

                        {/* <td className="p-2 text-sm text-green-700 whitespace-nowrap text-center">
                        <i class="fa-solid fa-user-plus" onClick={() => {shortlistCandidate(applicant.id)}}></i>
                        </td> */}
                        <td className="p-2 text-sm text-red-700 whitespace-nowrap text-center">
                          <i
                            class="fa-solid fa-trash"
                              onClick={() => {
                                handelRemoveCandidate(applicant.id);
                              }}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>): (<div className="text-center">
                <span className="text-red-600 text-xl font-semibold">No Shortlisted Candidates</span>
              </div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortlistedCandidates;
