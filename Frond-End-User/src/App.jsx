import Navbar from './Components/Navbar/Navbar'
import './App.css'
import RecruiterPrivateRoute from './Routes/RecruiterPrivateRoute'
import Home from './Components/Pages/Home/Home'
import Footer from './Components/Footer/Footer'
import { Routes, Route } from 'react-router-dom'
import Login from './Components/Pages/Login/Login'
import UserRegister from './Components/Pages/Register/UserRegister'
// import RecruiterRegister from './Components/Pages/Register/RecruiterRegister'
import VerifyOtp from './Components/Pages/verify-otp/VerifyOtp'
import { Provider } from 'react-redux'
import Store from './Redux/Store'
import { AuthProvider } from './Context/AuthContext'
import RecruiterProfile from './Components/Pages/RecruiterProfile/RecruiterProfile'
import MyJobs from './Components/Pages/RecruiterProfile/MyJobs'
import PostJob from './Components/Pages/RecruiterProfile/PostJob'
import EditProfile from './Components/Pages/RecruiterProfile/EditProfile'
import EditJob from './Components/Pages/RecruiterProfile/EditJob'
import SingleJobView from './Components/Pages/RecruiterProfile/SingleJobView'
import BrowseCandidates from './Components/Pages/RecruiterProfile/BrowseForCandiates/BrowseCandidates'
import SeekerPrivateRoute from './Routes/SeekerPrivateRoute'
import SeekerProfile from './Components/Pages/Seeker/SeekerProfile/SeekerProfile'
import EditSProfile from './Components/Pages/Seeker/SeekerProfile/EditProfile'
import BrowseJobs from './Components/Pages/Seeker/BrowseForJobs/BrowseJobs'
import SeekerJobView from './Components/Pages/Seeker/SingleJobView/SingleJobView'
import FavouriteJobs from './Components/Pages/Seeker/FavouriteJobs/FavouriteJobs'
import AppliedJobs from './Components/Pages/Seeker/AppliedJobs/AppliedJobs'
import CandidatesProfile from './Components/Pages/RecruiterProfile/CandidatesProfile/CandidateProfile'
import CompanyProfile from './Components/Pages/Seeker/CompanyProfile/CompanyProfile'
import PlanDetails from './Components/Pages/RecruiterProfile/SubscriptionPlan'
import ApplicationTracking from './Components/Pages/RecruiterProfile/ApplicationTracking/ApplicationTracking'
import ShortlistedCandidates from './Components/Pages/RecruiterProfile/ShortlistedCandidats/ShortlistedCandidates'
import Notifications from './Components/Pages/Notifications/Notifications'
import ForgetPassword from './Components/Pages/Register/ForgetPassword'
import Chat from './Components/Pages/Chat/chat'

function App() {

  return (
    <Provider store = {Store} >
    <div className="App">
      <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path='/user-register' element={<UserRegister />} />
        {/* <Route path='/recruiter-register' element={<RecruiterRegister />} /> */}
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/seeker-browse-jobs' element={<BrowseJobs />} />
        <Route path='/seeker-single-job-view' element={<SeekerJobView />} />
        <Route path='/notifications' element={<Notifications />} />


        <Route element={<RecruiterPrivateRoute/>}>
            <Route path='/recruiter-profile' element={<RecruiterProfile />} />
            <Route path='/recruiter-edit-profile' element={<EditProfile />} />
            <Route path='/recruiter-my-jobs' element={<MyJobs />} />
            <Route path='/application-tracking' element={<ApplicationTracking />} />

            <Route path='/recruiter-post-job' element={<PostJob />} />
            <Route path='/recruiter-edit-job' element={<EditJob />} />
            <Route path='/recruiter-single-job-view' element={<SingleJobView />} />
            <Route path='/recruiter-plan-details' element={<PlanDetails />} />

            <Route path='/recruiter-browse-candidates' element={<BrowseCandidates />} />
            <Route path='/candidates-profile' element={<CandidatesProfile />} />
            <Route path='/shortlisted-candidates' element={<ShortlistedCandidates />} />
            <Route path='/messages' element={<Chat />} />



        </Route>
        <Route element={<SeekerPrivateRoute />}>
          <Route path='/seeker-profile' element={<SeekerProfile />} />
          <Route path='/seeker-edit-profile' element={<EditSProfile />} />

          <Route path='/seeker-applied-jobs' element={<AppliedJobs />} />
          <Route path='/seeker-favourite-jobs' element={<FavouriteJobs />} />
          <Route path='/company-profile-view' element={<CompanyProfile />} />



        </Route>
        
      </Routes>
      <Footer />

      </AuthProvider>
    </div>
    </Provider>
  )
}

export default App