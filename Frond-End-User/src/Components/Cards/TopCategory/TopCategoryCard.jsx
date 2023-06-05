import React from "react";
import { useNavigate } from "react-router-dom";
import Job1 from "../../../assets/job1.svg";

function TopCategoryCard({category}) {
    const navigate = useNavigate()
  return (
    <div className="col-span-2 md:col-span-1">
      <div className="p-5">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md">
          <a href="#">
            <img className="rounded-t-lg" src={Job1} alt="" />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {category.category_name}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-900">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => navigate('/seeker-browse-jobs')}
            >
              BROWSE NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopCategoryCard;
