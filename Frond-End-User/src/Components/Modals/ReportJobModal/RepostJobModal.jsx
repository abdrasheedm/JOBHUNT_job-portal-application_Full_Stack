import React, { useEffect, useState } from "react";
import axios from "../../../axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ReportJobModal({ visible, onClose, jobID }) {
  if (!visible) return null;

  const token = JSON.parse(localStorage.getItem("token"));
  const profileId = localStorage.getItem("profile_id");

  if (visible) {
    document.body.style.overflow = "hidden";
  }

  const reasons = ['Inappropriate Content', 'Incomplete information about job / company', 'Fake job / Non-recruitment related job / Scam', 'Duplicate of another job on the site', 'Incorrect Email ID', 'Phone number not contactable']
  const [tags, setTags] = useState(
    new Array(reasons.length).fill(false)

  )

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not logged in!",
        confirmButtonText: "Signin",
      }).then(() => {
        document.body.style.overflow = "unset";
        navigate("/signin");
      });
      return;
    }
    let selectedReasons = tags.filter((reason) => reason !==false)
    let data = {
      "seeker_id" : profileId,
      "job_id": jobID,
      "tags": selectedReasons
    }
    axios.post('report-jobs/', data, {
      headers: {
        Authorization : `Bearer ${token.access}`
      }
    }).then((res) => {
      if (res.data.message==="You already reaported this job"){
        Swal.fire("Oops!", `${res.data.message} !`, "error").then(
          (res) => {
            onClose();
          }
        )
      }else{
        Swal.fire("Good job!", `${res.data.message} !`, "success").then(
          (res) => {
            onClose();
          }
        );
      }
     
    });

  }

  return (
    <div className="bg-gray-900 fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center">
      <div className="bg-white rounded-xl p-5">
        <div className="text-right">
          <i class="fa-solid fa-xl fa-square-xmark" onClick={onClose}></i>
        </div>
        <div>
          <h1 className="text-2xl font-bold p-10 text-center">Report Job</h1>
          <form action="" className="px-10" onSubmit={handleSubmit}>
            {reasons.map((reason, index) => {
              return(
                <div className="checkbox-wrapper">
              <label>
                <input type="checkbox" className="m-5" onChange={()=>{
                  let tag = tags
                  if (tag[index]===reason){
                    tag[index]=false
                  }else{
                  tag[index ] = reason
                  }
                  setTags(tag)
                } }/>
                <span key={index}>{reason}</span>
              </label>
            </div>
              )
            })}
            <div className="flex justify-center mb-5">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-myBlue border border-transparent rounded-md active:bg-gray-900 false"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportJobModal;
