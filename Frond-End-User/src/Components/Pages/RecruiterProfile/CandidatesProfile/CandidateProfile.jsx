import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../../../axios";
import AddExperience from "../../../Modals/ExperienceModal/AddExperience";
import ProjectModal from "../../../Modals/ProjectModal/ProjectModal";
import ProfileCard from "../../../Seeker/ProfileCard/SProfileCard";
import Swal from "sweetalert2";

function CandidatesProfile() {
    const locat = useLocation()
    const seekerID = locat.state?.data
//   const profile_id = localStorage.getItem("profile_id");
  const token = JSON.parse(localStorage.getItem("token"));




  const [profile, setProfile] = useState([]);
  const fetchProfile = () => {
    axios
      .get(`seeker-profile/?id=${seekerID}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setProfile(res.data);
      });
  };

  const [experiences, setExperiences] = useState([]);
  const fetchExperience = () => {
    axios
      .get(`seeker-experience/?id=${seekerID}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        localStorage.setItem("UserProfile", JSON.stringify(res.data));
        setExperiences(res.data);
      });
  };

  const [projects, setProjects] = useState([]);
  const fetchProjects = () => {
    axios
      .get(`seeker-project/?id=${seekerID}`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        setProjects(res.data);
      });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    fetchExperience();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, []);
  
  const navigate = useNavigate();

  return (
    <div className="bg-primary lg:py-20">
      <div className="grid lg:grid-cols-3">
        <ProfileCard seekerID={seekerID}/>
        <div className="lg:m-20 sm:m-10 col-span-2 ">
          <div className="bg-white p-16 rounded-2xl drop-shadow-2xl mb-5">
            <div className="flex justify-between">
              <h1 className="text-xl font-bold">Basic Information</h1>
              
            </div>

            <div className="grid grid-cols-3 mt-8">
              <div>
                <h1 className="mb-3">Year Of Experience</h1>
                <p className="font-bold "> {profile.year_of_experience}</p>
              </div>
              <div>
                <h1 className="mb-3">EMAIL</h1>
                <p className="text-sm font-bold overflow-x-auto">
                  {profile.seeker?.email}
                </p>
              </div>
              <div>
                <h1 className="mb-3">PHONE NUMBER</h1>
                <p className="font-bold ">{profile.seeker?.phone_number} </p>
              </div>
            </div>
            <div className="grid grid-cols-3 mt-8">
              <div>
                <h1 className="mb-3">LOCATION</h1>
                <p className="font-bold ">
                  {" "}
                  {profile.city}, &nbsp; {profile.state}{" "}
                </p>
              </div>
              <div>
                <h1 className="mb-3">AGE</h1>
                <p className="font-bold ">{profile.age}</p>
              </div>
              <div>
                <h1 className="mb-3">EXPERIENCE LEVEL</h1>
                <p className="font-bold ">{profile.level} </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="bg-white p-16 rounded-2xl drop-shadow-2xl mb-5 col-span-2 xl:col-span-2 xl:mr-2">
              <div className="flex justify-between">
                <h1 className="text-xl font-bold">Experience</h1>
                
              </div>
              {experiences.length ? (
                <div>
                  {experiences.map((experience, index) => {
                    return (
                      <div className="p-5 mt-5 grid grid-cols-9 bg-gray-200 rounded-lg shadow-md shadow-blue-100">
                        <div className="col-span-2">
                          <img
                            className="h-20 w-20"
                            src="data:image/jpeg;base64,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"
                            alt=""
                          />
                        </div>
                        <div className="px-5 col-span-6">
                          <h1 className="font-bold text-xl py-2">
                            {experience.job_title}
                          </h1>
                          <h2>{experience.company_name} </h2>
                          <h2>
                            {experience.start_date} - {experience.end_date}{" "}
                          </h2>
                          <h2>{experience.loacation}</h2>
                          <div>
                            <p className="italic text-gray-600">
                              {experience.description}
                            </p>
                          </div>
                        </div>
                        
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>No Experiences added</div>
              )}
            </div>
            {/* <div className="bg-white p-16 rounded-2xl drop-shadow-2xl mb-5 col-span-2 xl:col-span-1 xl:ml-2">
              <div className="flex justify-between">
                <h1 className="text-xl font-bold">Education</h1>
                <button className="bg-myBlue text-white text-lg px-8 py-1 rounded-lg">
                  Add Education
                </button>
              </div>
              <div className="py-5 grid grid-cols-9">
                <div className="col-span-2">
                  <img
                    className="h-20 w-20"
                    src="data:image/jpeg;base64,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"
                    alt=""
                  />
                </div>
                <div className="px-5 col-span-6">
                  <h1 className="font-bold text-xl py-2">University Name</h1>
                  <h2>stream</h2>
                  <h2>start date - end date</h2>
                  <h2>Calicut</h2>
                </div>
                <div className="col-span-1 pt-5">
                  <span className="bg-gray-200 p-3 rounded-3xl">
                    <i class="fa-sharp fa-solid fa-pen"></i>
                  </span>
                </div>
              </div>
            </div> */}
            <div className="bg-white p-16 rounded-2xl drop-shadow-2xl mb-5 col-span-2 xl:mr-2">
              <div className="flex justify-between">
                <h1 className="text-xl font-bold">Projects</h1>
                
              </div>
              {projects.length ? <div>
                {projects.map((project, index) => {
                  return (
                    <div className="p-5 mt-5 grid grid-cols-9 bg-gray-200 rounded-lg shadow-md shadow-blue-100">
                      <div className="col-span-2">
                        <img
                          className="h-20 w-20"
                          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCA4ODg4OEA4ODg4OEBAODg4PDhAQDw8OGBMYJRgTFxcaICwkGhwoHRgXJDUkKC0vMjIyGSM4SjgxPCwyMjIBCwsLDw4PHBERHTIpIyk1MzMyMzE0MTMzMjExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAAAQUGAwQHAv/EAD4QAAICAgAEBAQEBAQDCQEAAAABAgMEEQUSITEGQVFhExQigTJCcaEjYpGxFTNSwTWz0TREU2N0g5KTtAf/xAAbAQEAAgMBAQAAAAAAAAAAAAAAAQUCBAYDB//EADERAQABAwEGBAQGAwEAAAAAAAABAgMRIQQFEjFR8EFhkcFxobHRExQigeHxIzJCBv/aAAwDAQACEQMRAD8A9mAAAAgFAAAAAAAAIUgAAAAAAAAAAAAAAAAAAAAAABQAAAAAgFBCgAAAAAAhQAIUAQoAEKAAAAAhQBAUgAAAAAABQAIUAAABCgAAAAAAA43NbUdrbTaXm0u7190Ynj/GoYcFFaldYnyQfZL/AFS9v7mp+F+NSu4s/izcueuyiDk/z/TJ69PwNa9kelNuZpmprXNqoou02/Gfk9GBCnm2QAAAAAAAAAAAQAUAAAAAAAAAAAAAAAAAADjtsjCMpyeoxTlJvskl1ZyGC8ZXurhmXJecI1/ac4xf7SJiMzhjXVwUzV0jLzjP4pPKvtyJ7+ptwi/yRX4Y/ZfvswtVkoyjOMnGcJKcZrvGSe019zkjLo/dM4UWkREaOQ45qmZnm9f8LeIK+IVJNqOTWl8Wrtv/AMyK/wBL/bt+uwngmPkWUWQtqlKE09xnF9U/917HqPhjxXVmKNVrVWT2S/Ja/wCX0f8AL/c0rtmadY5L/Y9vi5ii5/t9f5bUCFNdZAAAAEAoAAAAAAAAAAAACFIUAAAAAAAAAYLxlQ7OGZcV+WuNn2rnGT/aJnTjsrjOMoyScZJxkn2cWuqJicTljXTxUzT1eCwZ8nd4zw6eDlW489/RLdcn+ep/hl/T90/Q6bLSJzrDkaqZomYnmNbQqlr7fsz6R8TWnv17ksY10b/4a8YuOqcuTnHoo5HeS9peq9+/69zfYTjKKlFqUZJOMotNNPzTPCa5mz+GvEdmHJVz3PHk+sPOH80f+nma13Z860rPZN5TR+i9y69Pj5dy9TBwY98LYRshJShNbjJdmjnNJfROQhQEgAAAAAAAAAAgKAAIAKAAAAAAAAACYGqeKOEU8SU64NQzKOtUn0VkdJuD9t/0fX1PL7abK5TqsjKucHyzjJalFnpGddJWzsi3GSscoyXdM+czFxeLRUbdUZsF9FsV+NejX5l/L3Xl5lfuvfNN2qbVzTWcfDOn7vLee5proi9a54jPfu83R9a2tHc4rwnIwrPhXR5W/wAE11rsXrGXn+nc6iOliYnWHJV0zTPDOkuKO4vR2YSPiUOZe67HzBtdH3DGr9UN38DcXddvys5fw7n/AA9/ks9F7P8Avo9EPEMe6Vcoyi9SjJTi/SSe0/2PaaLVZCFi7TjGa/RrZpbVRiri6r3dF6arc25/55fCfs5gAay3AAAAAAAAAAAAAEAAFAAAAACFAAhQIHmfGLsiu6xcy5OaSTS7Pb6P3Ogr5vvLfv0T39jY/ENKjkWxkvps1Ne6l3/fZrk63B67ryfscpXapoqqoxGky63Zq6a7dM48Gw4XGY3VfLZ1ayKZdOdrc4+jfrr1XVe5hePeF5Y8fmcaXzGI/q6dZVr+bXePv5efqSozHCuI2Y8vp+qEvxQf4Ze/syz2LeldmYi5rHfr9fipt6bls7TGaYxV330+DRonFbJNrS7eZufijgFbrediL+C+t1UV/lvzaXkvVeXft21D4Z1du7Tcoiqnk+eX9nr2a5NFzm4XBv1Z7bwLfyOJvv8AL0b/APrieN11ybUYrbk1FL1b7Ht2NUq66612hGMF+iWjw2rlH7+yz3Pmaq5+Hu5gAaa8AAAAAAAAAAAAAEAKAAAAAAAABCgAYHxNw93UqyK3ZVt6XeUPNfqu/wDU0hzT0eqGpcf8NublfjL6nuU6eyk/OUPR+xVbdsc1z+JRGvjHutt3bZTR/iuTp4T7S1tQ1r0fY7FZw4T5uaqScZQ8mtSX6r2Zzwi09PumUcTrNM84W9c+Es1wTK5LPhS067folF9Vt9E/9vuavx3hPyuTOpJ/DfWt/wAsuy+3VfYzNT11811X6mY8UYvxflrEty+pdF1e9NL+/wDU6Lcm0TEVUTyj3/pyH/pNji7RFcc4/iJ+vyhq/hPhruzK24/RQ/iT9NpfSv8A5a/oz04xfBOGrFq1pfEnqU37+S+3/UyhaXbnHVlp7v2b8vZ4Z5zrIADybwAAAAAAAAAAAAAgAAoIUAAAAAAgBQAAAw/FODVZDVsf4d8e00vxx/0z9V790azl0ShPUlqSfLJe6N+MB4lx1yRtS6p6l/s/7lNvTZImIv0c45+cTp8ufqsNi2mqK4t1TpyjyYLHi5OMV3k1Ffq2bu6otxbW3DfL7e5rPh3G57PiNfTX1/WT7L/f+htZ67rtTTbmufH6R/OUbwria4p6e4AC0aAAAAAAAAAAAAAAAACAACgAAAAABrcvGXDlKUVPIs5JSg5U4OXdW5RemozhW4y0010ZMRM8oRMxHNsgMFheKMPIthTX818SxtR58DMqhtJvrOdaiu3mzgl4x4cpSip5FnJKUHKrBzLa3KL0+WcK3GWmmtp+Q4auhxR1bIDBYPinByLoY8J3Rtt5vhRuxcijncVtqLsgk3pN69js8I45iZ/xvl7lY8ebqti4zhKE/eMknro9Ps9P0JmmqOcGYZQxvGanZRKEVuc3GMV78y3+239ica4zi8Pp+PlWqqvmUE+WUpSm/JRim5PSb6LsmdPN8V4FFvwbJ3OxQhby14mTdque+WTcIPW9M867U3aJpxpOYZU3OCqKumrK4GLGiuNceuuspf6pebO0ay/G3DYrcp5NcV3lZw/NhCK9ZSdekvdnZz/E+DjWumc7Z2KMZyjRjZGRywl+FydUZJbS2tmVNqaYimIRNeZzMs6DW3404cusp5NcdpOdmBmV1x35ynKtKK92zv8A+O4fzv8Ah/xUsvkViqcZLcNb+mWuVvXXSe9J+hlw1dEcUdWVB1s/LrxqbciyXJVTXO2yXK5csIpuT0ur6LyOvRxbHsvljRm/jqqvI5JQnFypn2si2tSW+j12ffRjhMyyIOjxPiVGHWrbp8sHOFUdRlOc7JPUYRjFNyk35JHdTBlQAAAAAAAAABAABQAAAIBTW/8A+f8A/CMT/wB//n2GxSelv06mp8O4JmY9UasXi0asfc501WYNNtlcZycuVy51zacn5ExMY4ZnvuUTE5zENuNd8Bf8Kxf1v/59hy4eDxGFkJ3cTruqi27Klg118y0/zqb110/sdHE4Fm4sPgY/FlVRGdkqqrMKmycIzm5crlzLm05Proy/TETGfr5+SNc5w7HiX/tvA/8A19v/AOK81/g/C7fkcfiOEl8/j25sZQb1HMxvnLW8eb9fOMvJ+zM7VwXJnk49+XxD5iOHOdlVUcWuhO2VTjzOSk20ozl06dTJcCwFhYyoVisUbL7PiaUf8y2c9a2+3Pr7DjpiMRPevXCOGZnXvk1Di+DdlcP4lxXNrddnyGXHBxJ/9zolTLcpL/xp+b8lpepzYvFJYnE8txw8zL+Jg8N38pXXY4csbvx80o63vp37M2vjGGszDysX4igsimyl2JKXIpxa5tbW9b9Th4dwuNOVfkK1Td1GLRyKKXKqVP6t7675/toccTE59PQ4ZywfHONX5eFmYtfCOKxtyce/HrlZTRCtTshJJyl8Xotvqzr8P4jLA4hxGp4mbky5OHxk8SlWxhKOMk1JuS17G8xnF9FJP9GjGYWHGnMzLnZt5aolyOKSgq4OPffXffsiIuUxE/fx0TNMzOnektY8X+IXdwvPq/w7idXxMa2PxLsWMKobi/qlLnekfc+EQzs/ilcpSrthTwy3Hvh/m498Y3ctkH/dea2jZuO4Uc3DycP4savmKp08+lLk5lrfLtb/AE2fGHw2NGZlZTtTeTXjVutpLk+Epre99d8/p5ExcpinTvl9kTTMzDXeI8Ysu4TxjEyoxq4hiYOQr61+C2Dply5FfrXL9ntMynFeEzycTEvx5KrPxK424lr7N8i5qZ+tc10a/R+R8+KPD1XE4SSsnj5FcZULIhFSbotjqyqSbXNBxl2b6PqvfP46jXCuvmi+SMYd0t6SXYj8SnGaZ75fdPDPKWqeG43cUuhxbJr+HVSpVYGI5KSrmvptvk/ObkpRj6JP12bmYvgeAsHGhjO1WckrZc7Si3z2SlrW325tfYyaFVUTOhTExGqgAxZAAAAAAAAIAABSFAAgAk+z/RmKSg6q4qqSs1Wt/BkmpJrb5tfr1MuDyuW+P5xy6s6a+Fi+d/Lyq5LOfklHl+HZrb3560cdkFH4i0vxTepYk5ttt9OZd16exlymE2M+Pl3qyi5jlHfoxddXNYuav6edtpraX8Gv19019iZVOpvlilH+C3qpyj0dm3yrv3j+xlCidnpmMeeSLs5YiVKlzPetR1qOLKC/FF7af4u3b0bDim2uRalGxSccadU4rlfVNvr6aMuB+Xjr36n4s9/0xVf44ahF/Ut6xZ1OK1+Lb7HNeoq5SnFtOtRi/huaUuZ+ieu6O+DKLWIxnv1z80TczOWFuTcLE4RUmrFpYs299damum/c54KuPOp1Nyc5PbplPafbqkZM69uPGb23Ltr6Zyiv6JmE2JicxOZ8+5Zfi50Y+lPk5eWTbWNJfS2nFfD317eTOVY8fgWbri5tW63Bc29y17+hkIQUUorokkkvRI+yadnjGvTHgibs+HXLEKGpT5lFty2ubFna2uVfmR38SPLXCO29RittNN9PR9jsAzt2oonPf1+zGuuaoAAerAAAAAAAABAAAAKBCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAACgQoAAhQAIUAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAB//9k="
                          alt=""
                        />
                      </div>
                      <div className="px-5 col-span-6">
                        <h1 className="font-bold text-xl py-2">
                          {project.project_title}
                        </h1>
                        <h2>associated with {project.company}</h2>
                        <h2>
                          {project.start_date} - {project.end_date}
                        </h2>
                        <a
                          href={project.project_url}
                          className="bg-myGreen text-white py-1 px-2 rounded-xl font-bold"
                        >
                          show project
                        </a>
                        <h2 className="italic py-3 text-gray-600">
                          {project.description}
                        </h2>
                      </div>
                      
                    </div>
                  );
                })}
              </div> : (
                <div>No projects added</div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidatesProfile;
