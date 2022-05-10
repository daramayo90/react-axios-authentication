import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import axios from "../api/axios";
const LOGIN_URL = "/auth";

function Login() {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/"; // Where the user came from

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      // Where the user wanted to go, before it went sent to the login page
      navigate(from, { replace: true }); 
    } catch (err) {
      const errorMsg = err.response.data.message;

      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (errorMsg) {
        setErrMsg(errorMsg);
      } else if (err.response?.status === 401) {
        setErrMsg(errorMsg);
      } else {
        setErrMsg("Login Failed");
      }

      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist(prev => !prev);
  }

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          ref={userRef}
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
        />

        <button>Sign In</button>
        <div className="persistCheck">
          <input 
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
           />
           <label htmlFor="persist">Trust this device</label>
        </div>
      </form>
      <p>
        Need an Account?
        <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
}

export default Login;
