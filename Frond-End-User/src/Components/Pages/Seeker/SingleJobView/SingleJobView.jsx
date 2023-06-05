import axios from "../../../../axios";
import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import ReportJobModal from "../../../Modals/ReportJobModal/RepostJobModal";
import { BASEURL } from "../../../../Constants";


function SeekerJobView() {
  const locat = useLocation();
  const navigate = useNavigate();
  const jobID = locat.state?.data;
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;
  const seekerId = localStorage.getItem("profile_id")
    ? localStorage.getItem("profile_id")
    : null;
  const [jobData, setJobData] = useState({});
  const [companyData, setCompanyData] = useState("");

  // const [jobId, setJobId] = useState()
  const [recruiterId, setRecruiterId] = useState();
  const [resume, setResume] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [FavouritedJobIDs, setFavouriteJobIDs] = useState();
  const [favourited, setFavourited] = useState(false);
  const fetchFavouritedJobIDs = () => {
    axios
      .get(`seeker-favourited-job/?id=${seekerId}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        let response = res.data;
        var job_id = [];
        response.map((job) => {
          job_id = [...job_id, job.job_id];
        });
        setFavouriteJobIDs(job_id);
      });
  };

  const [isApplied, setIsApplied] = useState(false);
  const [appliedJobIDs, setAppliedJobIDs] = useState([]);
  const fetchAppliedJobIds = () => {
    axios
      .get(`applied-jobs/?seeker_id=${seekerId}`, {
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
        setAppliedJobIDs(AppliedjobIds);
      });
  };

  const [isModal, setIsModal] = useState(false)
  const handelOnClose = () => {
    document.body.style.overflow = "unset";
    setIsModal(false);
  };

  const AddAndRemoveFavourite = (jobID) => {
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not logged in!",
        confirmButtonText: "Signin",
      }).then(() => {
        navigate("/signin");
      });
      return;
    }
    let data = {
      job_id: jobID,
      seeker_id: seekerId,
    };
    axios
      .post(`favourite-job/?seeker_id=${seekerId}&job_id=${jobID}`, data, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setFavourited(!favourited);
        Swal.fire({
          icon: "success",
          title: `${res.data.message} !`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleResume = (e) => {
    setResume(e.target.files[0]);
  };

  const fetchJobDetails = async () => {
    await axios.get(`view-single-job/?id=${jobID}`).then((res) => {
      setJobData(res.data);
      setCompanyData(res.data.company_id);
      // setJobId(res.data.id)
      setRecruiterId(res.data.company_id.id);
    });
  };

  const IMGURL = `${BASEURL+companyData?.company_logo}`;

  useEffect(() => {
    // window.scrollTo(0, 0);
    fetchJobDetails();
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetchFavouritedJobIDs();
  }, [favourited]);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetchAppliedJobIds();
  }, [isApplied]);
  const ApplyJob = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("job_id", jobID);
    formData.append("recruiter_id", recruiterId);
    formData.append("seeker_id", seekerId);
    formData.append("resume", resume);
    formData.append("is_applied", true);


    let url = `apply-job/`;
    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${token.access}`,
          // 'content-type': 'multipart/form-data'
        },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: `${res.data.message} !`,
          showConfirmButton: false,
          timer: 1500,
        });
        setIsApplied(!isApplied);
        // refreshPage();
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/1410260.jpg")`,
        backgroundSize: "cover",
      }}
    >
      <div className="">
        <div className="font-bold text-center text-3xl py-10 bg-primary">
          <h1 className="text-gray-600 uppercase">{jobData.job_title}</h1>
        </div>
        <div className="grid lg:grid-cols-6 xl:px-40 container mx-auto">
          <div className="col-span-4">
            <div className="px-10 py-5  my-10 shadow-xl rounded-lg  bg-slate-50 bg-opacity-50">
              <div className="my-10 px-10 py-5 border-b-2 border-gray-200 flex justify-between">
                <div className="p-5 mt-3 mr-5 bg-gray-100 rounded-xl">
                  <img
                    src="https://preview.colorlib.com/theme/jobsco/assets/img/icon/1.svg"
                    alt=""
                  />
                </div>

                <div>
                  <h1 className="text-2xl my-5 font-semibold text-gray-600">
                    {jobData.job_title}
                  </h1>
                  <div className="flex justify-between">
                    <h1 className="">{jobData.location}</h1>
                    <h1 className="">{jobData.job_type}</h1>
                  </div>
                </div>
                <div className="pt-10">
                  <span
                    className={
                      FavouritedJobIDs?.includes(jobID)
                        ? "text-white bg-myGreen p-2 rounded bg-opacity-90 hover:bg-myGreen hover:bg-opacity-100 mt-4"
                        : "bg-green-100 p-2 rounded bg-opacity-60 text-myGreen hover:text-white hover:bg-myGreen"
                    }
                    onClick={() => {
                      AddAndRemoveFavourite(jobID);
                    }}
                  >
                    <i className="fa-regular fa-2xl fa-heart"></i>
                  </span>
                </div>
              </div>
              <div>
                <div className="my-10 px-10 py-5">
                  <h1 className="text-xl font-semibold my-5">
                    Job Description
                  </h1>
                  <p className="text-gray-700 tracking-wide leading-7">
                    &ensp;&ensp;&ensp;{jobData.full_description}
                  </p>
                </div>
                <div className="my-10 px-10 py-5">
                  <h1 className="text-xl font-semibold my-5">
                    Minimum Qualification
                  </h1>
                  <p className="text-gray-700 tracking-wide leading-7">
                    Applicant should have atleast &nbsp;
                    <span className="font-semibold">
                      {jobData.qualification?.title}
                    </span>{" "}
                    qualification.
                  </p>
                </div>
                <div className="my-10 px-10 py-5">
                  <h1 className="text-xl font-semibold my-5">Category</h1>
                  <p className="text-gray-700 tracking-wide leading-7">
                    This Job is under the
                    <span className="font-semibold">
                      {jobData.category?.category_name}
                    </span>{" "}
                    category
                  </p>
                </div>
                <div className="my-10 px-10 py-5">
                  <h1 className="text-xl font-semibold my-5">Department</h1>
                  <p className="text-gray-700 tracking-wide leading-7">
                    This job comes under{" "}
                    <span className="font-semibold">
                      {jobData.department?.department_name}
                    </span>
                    Department
                  </p>
                </div>
                <div className="my-10 px-10 py-5">
                  <h1 className="text-xl font-semibold my-5">Employee Level</h1>
                  <p className="text-gray-700 tracking-wide leading-7">
                    <span className="font-semibold">{jobData.level}</span>
                    level employees are accepeted
                  </p>
                </div>
                <div className="border-t-2">
                  <div className="text-blue-600 font-bold pt-4 flex justify-between">
                    <span>{companyData.company_name}</span>
                    <span className="hover:cursor-pointer p-1 " onClick={() => setIsModal(true)}>Report this job</span>
                  </div>
                </div>
              </div>
              <ReportJobModal visible={isModal} onClose={handelOnClose} jobID={jobID}/>
            </div>
            <div>
              <div className="shadow-xl rounded-lg my-10 px-10 py-10  bg-slate-50 bg-opacity-50">
                <div className="border-b-2 border-gray-200 text-2xl my-5 font-semibold text-gray-600 pb-5">
                  Apply for the job
                </div>
                <div>
                  {appliedJobIDs.includes(jobID) ? (
                    <div>
                      <div>
                        You applied for this job.{" "}
                        <Link
                          className="text-myBlue underline"
                          to="/seeker-applied-jobs"
                        >
                          See applied jobs Here
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <form
                      noValidate=""
                      action=""
                      className="space-y-12 ng-untouched ng-pristine ng-valid"
                      onSubmit={ApplyJob}
                    >
                      <div className="grid grid-cols-2 mb-5">
                        <div className="col-span-2 md:col-span-1 px-5">
                          <label
                            htmlFor="firstName"
                            className="block mb-2 text-sm"
                          >
                            First Name
                          </label>
                          <input
                            type="name"
                            name="firstName"
                            id="firstName"
                            placeholder="Enter Your First Name"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-700 bg-transparent"
                            onChange={handleFirstName}
                            value={firstName}
                            required
                          />
                        </div>
                        <div className="col-span-2 md:col-span-1 px-5">
                          <label
                            htmlFor="LastName"
                            className="block mb-2 text-sm"
                          >
                            Last Name
                          </label>
                          <input
                            type="name"
                            name="lastName"
                            id="lastName"
                            placeholder="Enter Your Last Name"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-700 bg-transparent "
                            onChange={handleLastName}
                            value={lastName}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 mb-5">
                        <div className="col-span-2 md:col-span-1 px-5">
                          <label htmlFor="email" className="block mb-2 text-sm">
                            Email address
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter Your Email"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-700 bg-transparent "
                            onChange={handleEmail}
                            value={email}
                            required
                          />
                        </div>
                        <div className="col-span-2 md:col-span-1 px-5">
                          <label
                            htmlFor="number"
                            className="block mb-2 text-sm"
                          >
                            PhoneNumber
                          </label>
                          <input
                            type="tel"
                            name="telphone"
                            placeholder="888 888 8888"
                            // pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                            maxLength="10"
                            title="Ten digits code"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-700 bg-transparent "
                            onChange={handlePhone}
                            value={phone}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 mb-5">
                        <div className="col-span-2 md:col-span-1 px-5">
                          <label
                            htmlFor="firstName"
                            className="block mb-2 text-sm"
                          >
                            Upload Resume
                          </label>
                          <input
                            type="file"
                            name="firstName"
                            id="firstName"
                            placeholder="Enter Your First Name"
                            className="w-full px-3 py-2 border rounded-md dark:border-gray-700 bg-transparent"
                            onChange={handleResume}
                            // value={resume}
                            required
                          />
                        </div>
                      
                      </div>

                      <div className="flex justify-center py-5">
                        {token ? (
                          <button
                            type="submit"
                            className="inline-flex items-center px-10 py-2 ml-4 text-md font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-myGreen border border-transparent rounded-md active:bg-gray-900 false"
                          >
                            Apply Now
                          </button>
                        ) : (
                          <div>
                            Please{" "}
                            <Link to="/signin" className="text-myBlue">
                              Signin
                            </Link>{" "}
                            to apply{" "}
                          </div>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 col-span-6 px-10 ">
            <div className="shadow-xl rounded-lg my-10 px-10 py-10  bg-slate-50 bg-opacity-50">
              <div className="border-b-2 border-gray-200 text-2xl my-5 font-semibold text-gray-600 pb-5">
                Job Summary
              </div>
              <div className="text-gray-600 py-1">
                published on :{" "}
                <span className="text-gray-900 font-semibold">
                  {jobData.created_at}
                </span>
              </div>
              <div className="text-gray-600 py-1">
                vacancy:{" "}
                <span className="text-gray-900 font-semibold">
                  {jobData.vacancy}
                </span>
              </div>
              <div className="text-gray-600 py-1">
                salary range :{" "}
                <span className="text-gray-900 font-semibold">
                  {jobData.salary_range}
                </span>
              </div>
              <div className="text-gray-600 py-1">
                Location :{" "}
                <span className="text-gray-900 font-semibold">
                  {jobData.location}
                </span>
              </div>
              <div className="text-gray-600 py-1">
                Job Nature :{" "}
                <span className="text-gray-900 font-semibold">
                  {jobData.job_type}
                </span>
              </div>
            </div>
            <div>
              <div className="shadow-xl rounded-lg my-10 px-10 py-10  bg-slate-50 bg-opacity-50">
                <div className="border-b-2 border-gray-200 text-2xl my-5 font-semibold text-gray-600 pb-5">
                  About the Company
                </div>
                <div className="py-3">
                  <img
                    className="h-32 w-32 object-cover rounded-full hover:cursor-pointer"
                    src={IMGURL}
                    alt=""
                    onClick={() =>
                      navigate("/company-profile-view", {
                        state: { data: companyData.id },
                      })
                    }
                  />
                </div>
                <div className="text-gray-600 py-1">
                  Company Name :&nbsp;
                  <span className="text-gray-900 font-semibold">
                    {companyData.company_name}
                  </span>
                </div>
                <div className="text-gray-600 py-1">
                  Started Date:{" "}
                  <span className="text-gray-900 font-semibold">
                    {companyData.started_date}
                  </span>
                </div>
                <div className="text-gray-600 py-1">
                  Founder :{" "}
                  <span className="text-gray-900 font-semibold">
                    {companyData.founder}
                  </span>
                </div>
                <div className="text-gray-600 py-1">
                  CEO :{" "}
                  <span className="text-gray-900 font-semibold">
                    {companyData.ceo_name}
                  </span>
                </div>
                <div className="text-gray-600 py-1">
                  Head office Location :{" "}
                  <span className="text-gray-900 font-semibold">
                    {companyData.head_office_location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeekerJobView;
