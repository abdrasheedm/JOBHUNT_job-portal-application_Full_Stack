import React, { useEffect } from "react";
import HeroImg from "../../../assets/hero-img.png";
import BrowseTopJobs from "./BrowseTopJobs";
import FindTalent from "./FindTalent";
import BrowseTopCategory from "./BrowseTopCategory";
import { useNavigate, Navigate } from "react-router-dom";

function Home() {

  const userType = JSON.parse(localStorage.getItem('userType'))



  return (
    <div>
      {userType==="Recruiter" ? <Navigate to='recruiter-profile'/> : (<div>
      <div className="container-md flex flex-wrap justify-center bg-primary">
        <div className="px-10 py-20">
          <h4 className="py-10 font-medium text-lg md:text-xl">
            Easiest way to find a perfect job
          </h4>
          <h1 className="py-5 text-2xl md:text-6xl font-bold">
            Find Your Next <br />
            Dream Job
          </h1>
          <button className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white font-medium py-2 px-8 rounded-xl mx-5 ">
            LOOKING FOR A JOB ?
          </button>
          {userType === "Recruiter" ? (<button className="bg-myGreen text-white font-medium py-2 px-8 rounded-xl mx-5 ">
            FIND TALENT
          </button>) : ""}
        </div>
        <div className="px-10 mt-20">
          <img className="md:h-50 sm:20" src={HeroImg} alt="" />
        </div>
      </div>

      <BrowseTopJobs />
      {userType==="Recruiter" ? <FindTalent /> : ""}
      
      <BrowseTopCategory />
    </div>) }
    </div>
  );
}

export default Home;
