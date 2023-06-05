import { Navigate, Outlet } from "react-router-dom";

const SeekerPrivateRoute = () => {

   let userType = JSON.parse(localStorage.getItem('userType'))

   return userType ==="JobSeeker" ? <Outlet /> : <Navigate to="/*" />
}

export default SeekerPrivateRoute;