import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../../axios"
import ProfileCard from "../../../Recruiter/ProfileCard/ProfileCard";

function CompanyProfile() {
    const locat = useLocation()
    const CompId = locat.state?.data
  const token = JSON.parse(localStorage.getItem("token"))

  const [profile, setProfile] = useState([])
  const fetchProfile = () => {
    axios.get(`company-profile/?id=${CompId}`, {
      headers: {
        Authorization: `Bearer ${token.access}`
      }
    }).then((res) => {
      setProfile(res.data)
    })
  }

useEffect(() => {
  fetchProfile()

}, [])
const navigate = useNavigate()

  return (
    <div className="bg-primary lg:py-20">
      <div className="grid lg:grid-cols-3">
        <ProfileCard CompId = {CompId}/>
        <div className="lg:m-20 sm:m-10 col-span-2 ">
          <div className="bg-white p-16 rounded-2xl drop-shadow-2xl mb-5">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">Basic Information</h1>
          </div>

          <div className="grid grid-cols-3 mt-8">
            <div>
                <h1 className="mb-3">EMPLOYER ID</h1>
                <p className="font-bold "> # {profile.employer_id}</p>
            </div>
            <div>
            <h1 className="mb-3">EMAIL</h1>
                <p className="text-sm font-bold overflow-x-auto">{profile.recruiter?.email}</p>

            </div>
            <div>
            <h1 className="mb-3">PHONE NUMBER</h1>
                <p className="font-bold ">{profile.recruiter?.phone_number} </p>

            </div>
          </div>
          <div className="grid grid-cols-3 mt-8">
            <div>
                <h1 className="mb-3">LOCATION</h1>
                <p className="font-bold "> {profile.head_office_location}</p>
            </div>
            <div>
            </div>
            <div>
            <h1 className="mb-3">FOUNDER</h1>
                <p className="font-bold ">{profile.founder} </p>

            </div>
          </div>
          </div>
          <div className="bg-white p-16 rounded-2xl drop-shadow-2xl mb-5">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">Gallery</h1>
          </div>

          <div className="grid grid-cols-3 mt-8">
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVAmzvoHuZgTGb8Fa8Xd_00KIz9_RlKyUInZH3eFc&s" alt="" />
            </div>
            <div>
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVAmzvoHuZgTGb8Fa8Xd_00KIz9_RlKyUInZH3eFc&s" alt="" />
            </div>

            </div>
            <div>
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVAmzvoHuZgTGb8Fa8Xd_00KIz9_RlKyUInZH3eFc&s" alt="" />
            </div>

            </div>
          </div>
          <div className="grid grid-cols-3 mt-8">
            <div>
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVAmzvoHuZgTGb8Fa8Xd_00KIz9_RlKyUInZH3eFc&s" alt="" />
            </div>
            </div>
            <div>
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVAmzvoHuZgTGb8Fa8Xd_00KIz9_RlKyUInZH3eFc&s" alt="" />
            </div>
            </div>
            <div>
            <div>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVAmzvoHuZgTGb8Fa8Xd_00KIz9_RlKyUInZH3eFc&s" alt="" />
            </div>

            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
