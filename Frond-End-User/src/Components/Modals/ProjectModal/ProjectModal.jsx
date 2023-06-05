import React, { useEffect, useState } from 'react'
import axios from "../../../axios";
import Swal from 'sweetalert2'



function ProjectModal({ visible , onClose, Type, ExpId}) {
  if(!visible) return null;

  const toggleIsPresent = () => {
    setIsPresent(!isPresent)
  }

  const token = JSON.parse(localStorage.getItem("token"));
  const profileId = localStorage.getItem("profile_id");

  const fetchExperience = async () => {
    await axios.get(`seeker-project-single/?id=${ExpId}`,{
      headers: {
        Authorization: `Bearer ${token.access}`,
      }
    }).then((res) => {
      setProjectTitle(res.data.project_title)
      setStartDate(res.data.start_date)
      setEndDate(res.data.end_date)
      setProjectURL(res.data.project_url)
      setDescription(res.data.description)

    })
  }

  const [projectTitle, setProjectTitle] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [projectURL, setProjectURL] = useState('')
  const [description, setDescription] = useState('')
  const [isPresent, setIsPresent] = useState(false)
  



  const handleProjectTitle = (e) => {
    setProjectTitle(e.target.value)
  }

  const handleStartDate = (e) => {
    setStartDate(e.target.value)
  }
  const handleEndDate = (e) => {
    setEndDate(e.target.value)
  }
  const handleProjectURL = (e) => {
    setProjectURL(e.target.value)
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
  }

  useEffect(() => {
    if(Type==='edit'){
      fetchExperience()
    }
  }, [])

  function refreshPage() {
    window.location.reload(false);
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      user_id : profileId,
      project_title : projectTitle,
        is_current : isPresent,
        start_date : startDate,
        project_url : projectURL,
        description : description,
    }
    if(!isPresent){
      data.end_date = endDate

    }
    if(Type==='add'){
      axios.post("post-seeker-project/", data, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        }
      }).then((res) => {
        Swal.fire(
          'Good job!',
          `${res.data.message} !`,
          'success'
        ).then((res)=>{
        refreshPage()

        })
      })
    }else{
      axios.post(`update-seeker-project/?id=${ExpId}`, data, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        }
      }).then((res) => {
        Swal.fire(
          'Good job!',
          `${res.data.message} !`,
          'success'
        ).then((res)=>{
        refreshPage()

        })
      })

    }
    

    
  };


  return (
    <div className='bg-gray-900 fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center'>
        <div className="bg-white p-16 rounded-2xl drop-shadow-2xl mb-5">
            {Type==='add' ? (<h1 className="text-center font-bold text-3xl">Add Project</h1>) : <h1 className="text-center font-bold text-3xl">Edit Project</h1>}
            
            <form
              novalidate=""
              action=""
              className="space-y-12 ng-untouched ng-pristine ng-valid"
              onSubmit={handleSubmit}
            >
              <div className="my-5">
              <div className='mb-5 px-5 flex justify-center'>
                <label htmlFor="check-box-1" className='text-lg mr-5'>
                  Is Present
                </label>
                <input type="checkbox" id='check-box-1' value={isPresent} onChange={toggleIsPresent}/>

              </div>
                <div className="grid grid-cols-2 mb-5">
                  <div className="col-span-2 md:col-span-2 px-5">
                    <label for="firstName" className="block mb-2 text-sm">
                      Project Title
                    </label>
                    <input
                      type="name"
                      name="firstName"
                      id="firstName"
                      placeholder="Enter Job Title"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100"
                      onChange={handleProjectTitle}
                      value={projectTitle}
                      required
                    />
                  </div>
                  
                </div>
                <div className="grid grid-cols-2">
                  <div className="col-span-2 md:col-span-1 px-5">
                    <label for="text" className="block mb-2 text-sm">
                      start date
                    </label>
                    <input
                      type="date"
                      name="Startdate"
                      id="Sdate"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                      onChange={handleStartDate}
                      value={startDate}
                      required
                    />
                  </div>
                  {isPresent ? "": (
                    <div className="col-span-2 md:col-span-1 px-5">
                    <label for="number" className="block mb-2 text-sm">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                      onChange={handleEndDate}
                      value={endDate}
                      required
                    />
                  </div>
                  )}
                  <div className="col-span-2 md:col-span-1 px-5">
                    <label for="text" className="block mb-2 text-sm">
                      Project URL
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="Sdate"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                      onChange={handleProjectURL}
                      value={projectURL}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="col-span-2 px-5">
                    <label for="number" className="block mb-2 text-sm">
                    Description
                    </label>
                    <textarea
                      type="date"
                      name="endDate"
                      className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-100 "
                      onChange={handleDescription}
                      value={description}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="my-5">
                
                <div className="">
                  
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-myBlue border border-transparent rounded-md active:bg-gray-900 false"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-red-500 border border-transparent rounded-md active:bg-gray-900 false"
                  onClick={onClose}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
    </div>
  )
}

export default ProjectModal