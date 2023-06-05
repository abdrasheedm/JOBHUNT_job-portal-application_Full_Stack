import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";
import MembershipPlanModal from "../../Modals/MembershipPlanModal/MembershipPlanModal";
import ProfileCard from "../../Recruiter/ProfileCard/ProfileCard";

function PlanDetails() {
  const profile_id = localStorage.getItem("profile_id");
  const token = JSON.parse(localStorage.getItem("token"));

  const [planDetails, setPlanDetails] = useState([])
  const fetchPlan = () => {
    axios.get(`plan-details-view/?user_id=${profile_id}`, {
      headers: {
        Authorization: `Bearer ${token.access}`
      }
    }).then((res) => {
      setPlanDetails(res.data)
    })
  }

  const [planModal, setPlanModal] = useState(false)
  const [isFirst, setIsFirst] = useState(false)
  const handelOnClose = () => {
    document.body.style.overflow = "unset";
    setPlanModal(false);
  };

  const validity = (key) => {
    {{switch (key) {
      case 0:
        return '15 Days'
        break;
        case 30:
          return '1 Month'
          break;
          case 90:
        return '3 Months'
        break;
        case 180:
          return '6 Months'
          break;
    
      default:
        break;
    }}}
  }



  useEffect(() => {
    fetchPlan()
  }, [planModal]);
  const navigate = useNavigate();

  return (
    <div className="bg-primary lg:py-20">
      <h1 className="text-center text-3xl font-bold">Subsciption Details</h1>
      <div className="grid lg:grid-cols-3">
        <ProfileCard />
        <div className="lg:m-20 sm:m-10 col-span-2 ">
          <div className="bg-white p-16 rounded-2xl drop-shadow-2xl mb-5">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold">Current Subscription Plan</h1>
              {!planDetails.is_active_job ? (<button
                className="bg-myBlue text-white text-lg px-8 py-1 rounded-lg"
                onClick={() => {
                  setPlanModal(true)
                }}
              >
                Upgrade Plan
              </button>) : ''}
            </div>

            <div className="grid grid-cols-3 mt-8">

              <div>
                <h1 className="mb-3">Package Name</h1>
                <p className="font-bold "> # {planDetails.membership?.title}</p>
              </div>
              <div>
                <h1 className="mb-3">Validity</h1>
                <p className="text-sm font-bold overflow-x-auto">
                  {validity(planDetails.membership?.duration)}
                </p>
              </div>
              <div>
                <h1 className="mb-3">Activation Date</h1>
                <p className="font-bold ">{planDetails?.activation_date} </p>
              </div>
            </div>
            <div className="grid grid-cols-3 mt-8">
              <div>
                <h1 className="mb-3">Expiry Date</h1>
                <p className="font-bold "> {planDetails?.expiry_date}</p>
              </div>
              <div>
              <h1 className="mb-3">Remaining Jobs</h1>
                <p className="font-bold "> {planDetails?.postable_job_count}</p>
              </div>
              <div>
                <h1 className="mb-3">Status</h1>
                <p className="font-bold ">{planDetails.is_active ? 'Active' : 'Expired'} </p>
              </div>
            </div>
          </div>
          <MembershipPlanModal visible={planModal} isFirst={isFirst} onClose={handelOnClose}/>
         
        </div>
      </div>
    </div>
  );
}

export default PlanDetails;
