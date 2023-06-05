import React, { useEffect, useState } from "react";
import HomePageCard from "../../Cards/HomePageCard/HomePageCard";
import axios from '../../../axios'

function BrowseTopJobs() {

  const [topJobs, setTopJobs] = useState([])
    const fetchTopJobs = () => {
        axios.get('top-job-view/').then((res) => {
            setTopJobs(res.data)
        })
    }

    useEffect(() => {
        fetchTopJobs()
    }, [])
  return (
    <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-2xl">
      <div className="py-20">
        <div className="text-center">
          <span className="text-5xl font-bold text-myBlue">1000+</span>
          <div className="py-10">
            <h1 className="text-4xl font-bold pb-10">
              Browse From Our Top Jobs
            </h1>
            <p className="text-xl">
              The automated process starts as soon as your clothes go into the
              machine. The outcome is gleaming clothes. Placeholder text
              commonly used.
            </p>
          </div>
        </div>
        <div className="flex justify-center overflow-scroll shadow-xl">
          {topJobs?.map((job, index) => {
            return(
              <HomePageCard job = {job}/>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default BrowseTopJobs;
