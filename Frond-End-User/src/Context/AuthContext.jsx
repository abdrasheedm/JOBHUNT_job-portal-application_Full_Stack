import { createContext, useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { BASEURL } from "../Constants";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken")
      ? JSON.parse(localStorage.getItem("authToken"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authToken")
      ? jwt_decode(localStorage.getItem("authToken"))
      : null
  );
  let [admin, setAdmin] = useState(() =>
    localStorage.getItem("admin")
      ? jwt_decode(localStorage.getItem("admin"))
      : null
  );
  let [adminToken, setadminToken] = useState(() =>
    localStorage.getItem("admin")
      ? JSON.parse(localStorage.getItem("admin"))
      : null
  );
  let [token, setToken] = useState(() =>
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );
  let [loading, setLoading] = useState(localStorage.getItem('token') ? true : false);
  // let [recruiter,setRecruiter]=useState(()=>localStorage.getItem('adminAuthToken')? jwt_decode(localStorage.getItem('adminAuthToken')):null)
  let [adminAuthToken, setAdminAuthToken] = useState(() =>
    localStorage.getItem("adminAuthToken")
      ? JSON.parse(localStorage.getItem("adminAuthToken"))
      : null
  );

  let [errorMsg, SetErrorMsg] = useState("");
  let [isReaded, setIsReaded] = useState(false)

  const navigate = useNavigate();
  // const BASEURL = 'http://10.4.0.85:8000'

  const Userlogin = async (email, password) => {
    await axios
      .post("user/signin/", { email: email, password: password })
      .then((res) => {

        if (res.data.token) {

          if (res.data.user.user_type == "JobSeeker") {
            localStorage.setItem("authToken", JSON.stringify(res.data));
            localStorage.setItem("token", JSON.stringify(res.data.token));
            localStorage.setItem(
              "userType",
              JSON.stringify(res.data.user.user_type)
            );
            localStorage.setItem(
              "profile_id",
              JSON.stringify(res.data.profile_id)
            );
            setToken(res.data.token);
            setAuthToken(res.data);
            setUser(res.data.token);
            //  SetError(res.data.message)
            localStorage.setItem(
              "userId",
              JSON.stringify(res.data.user.user_id)
            );
            navigate("/");
            window.location.reload(false)
          } else if (res.data.user.user_type == "Recruiter") {
            localStorage.setItem("authToken", JSON.stringify(res.data));
            localStorage.setItem("token", JSON.stringify(res.data.token));
            localStorage.setItem(
              "profile_id",
              JSON.stringify(res.data.profile_id)
            );
            localStorage.setItem(
              "userType",
              JSON.stringify(res.data.user.user_type)
            );
            setAdminAuthToken(res.data);
            setUser(res.data.token);

            //  setRecruiter(res.data.token)
            //  SetError(res.data.message)
            localStorage.setItem(
              "userId",
              JSON.stringify(res.data.user.user_id)
            );
            navigate("/recruiter-profile");
            window.location.reload(false)
          } else {
            localStorage.setItem("admin", JSON.stringify(res.data));
            localStorage.setItem("token", JSON.stringify(res.data.token));
            setadminToken(res.data);
            setAdmin(res.data.token);
            //  SetError(res.data.message)
            navigate("/");
          }
        } else {
          SetErrorMsg(res.data.message);
        
        }
      })
      .catch((response) => SetErrorMsg("Invalid Email or Password"));
  };

  let logOut = () => {
    if(!token){
      return
    }
    axios
      .post(
        "user/logout/",
        { refresh_token: token?.refresh },
        {
          headers: {
            Authorization: `Bearer ${token?.access}`,
          },
        }
      )
      .then((res) => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("adminAuthToken");
        localStorage.removeItem("Admintoken");
        localStorage.removeItem("admin");
        localStorage.removeItem("profile_id");
        localStorage.removeItem("CompanyProfile");
        localStorage.removeItem("userType");
        localStorage.removeItem("UserProfile");

        setUser(null);
        setAuthToken(null);
        navigate("/signin");
        window.location.reload(false)
        window.location.reload(false)
      });
  };

  let updateToken = async () => {
   
    let response = await fetch(`${BASEURL}/api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: token?.refresh }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setToken(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("token", JSON.stringify(data));
    } else {
      logOut();
    }

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
  
      if (loading) {
        updateToken();
      }

    

    let fourMinute = 1000 * 60 * 4;
    let interval = setInterval(() => {
      if (token) {
        updateToken();
      }
    }, fourMinute);
    return () => clearInterval(interval);
  }, [token, loading]);

  const [mobile, setMobile] = useState("");
  let contextData = {
    user: user,
    Userlogin: Userlogin,
    logOut: logOut,
    authToken: authToken,
    adminToken: adminToken,
    mobile: mobile,
    setMobile: setMobile,
    errorMsg: errorMsg,
    SetErrorMsg : SetErrorMsg,
    adminAuthToken: adminAuthToken,
    admin: admin,
    isReaded : isReaded,
    setIsReaded : setIsReaded
    // BASEURL :BASEURL
    // setShow:setShow,
    // handleClose:handleClose,
    // handleShow:handleShow,
    // show:show,
    // handleCloses:handleCloses,
    // opens:opens,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
