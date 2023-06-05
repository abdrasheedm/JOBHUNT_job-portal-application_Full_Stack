import { Navigate, Outlet } from "react-router-dom";

 const RecruiterPrivateRoute = () => {

    let userType = JSON.parse(localStorage.getItem('userType'))

    return userType ==="Recruiter" ? <Outlet /> : <Navigate to="/*" />
 }

 export default RecruiterPrivateRoute;