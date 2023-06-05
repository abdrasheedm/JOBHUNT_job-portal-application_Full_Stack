import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card1 from "../../../assets/card1.webp";
import axios from "../../../axios";

function HomePageCard({ job }) {
    const navigate = useNavigate()
  return (
    <div className="py-5 min-w-[400px]">
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl">
        <a href="#">
          <img className="rounded-t-lg" src={Card1} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              {job.job_title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-900">
            {job.category?.category_name}
          </p>
          <button
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() =>
                navigate("/seeker-single-job-view", {
                  state: { data: job.id },
                })
              }
          >
            Apply Now
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePageCard;
