import React, { useState } from "react";
import { toast } from "react-toastify";
import { authenticate, isAuth } from "../../helpers/auth";
import axios from "axios";
import { Redirect } from "react-router-dom";
import "../../css/floating-labels.css";

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
    password1: "",
  });
  const { email, password1 } = formData;

  //handle input changes
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  //submit to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password1) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
          email,
          password: password1,
        })
        .then((res) => {
          if (res.data) {
            authenticate(res, () => {
              setFormData({
                ...formData,
                email: "",
                password1: "",
              });
              // console.log(res.data);
            });
            //authorise
            isAuth() && isAuth().role === "admin"
              ? history.push("/")
              : history.push("/");
            toast.success(`Welcome ${res.data.user.name}`);
            // console.log(res.data.user);
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((err) => {
          if (err.response) toast.error(err.response.data.error);
          else toast.error("Something went wrong");
        });
    } else {
      toast.error("please fill all fields");
    }
  };

  return (
    <div className="body-login  w3-gray">
      {isAuth() ? <Redirect to="/" /> : null}

      <form className="form-signin text-center col-6  " onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <img
            className="mb-4"
            src="../../assets/images/alpha-helix-logo-1069x322-quarter-128x128-15.png"
            alt=""
            width="72"
            height="72"
          />
          <h1 className="h3 mb-3 font-weight-normal"> Please Signin</h1>
          <p>
            Signin with your registered email address
            <br />
            {/* <a href="/register">or click here to register.</a> */}
          </p>
        </div>

        <div className="form-label-group">
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
            onChange={handleChange("email")}
            value={email}
          />
          <label htmlFor="inputEmail">Email address</label>
        </div>
        <div className="form-label-group">
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
            onChange={handleChange("password1")}
            value={password1}
          />
          <label htmlFor="inputPassword">Password</label>
        </div>
        {/* <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div> */}
        <button className="btn btn-lg btn-primary btn-block mt-5" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted text-center">
          &copy; Croissance Edu
        </p>
      </form>
    </div>
  );
};

export default Login;
