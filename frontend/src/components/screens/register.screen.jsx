import React, { useState } from "react";
import { toast } from "react-toastify";
import { isAuth } from "../../helpers/auth";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Navbar from "../navbar.component";
import Footer from "../footer.component";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
    imagePath: "",
    role: "student",
  });
  const { name, email, password1, password2, imagePath, role } = formData;

  //handle input changes
  const handleChange = (text) => (e) => {
    setFormData({ ...formData, [text]: e.target.value });
    //console.log(`${process.env.SERVER_URL}/register`);
    //console.log(formData);
  };
  //submit to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/api/register`, {
            name,
            email,
            password: password1,
            imagePath,
            role,
          })
          .then((res) => {
            setFormData({
              ...formData,
              name: "",
              email: "",
              password1: "",
              password2: "",
              imagePath: "",
              role: "student",
            });

            toast.success(res.data.message);
          })
          .catch((err) => {
            toast.error(err.response.data.error);
          });
      } else {
        toast.error("Passwords don't match");
      }
    } else {
      toast.error("please fill all fields");
    }
  };

  return (
    <React.Fragment>
      {!isAuth() ? (
        <Redirect to="/" />
      ) : (
        <React.Fragment>
          <Navbar />

          <section className=" mbr-section mbr-after-navbar   w3-gray">
            <div className="list-group container min-vh-100">
              <div>
                {isAuth() ? (
                  isAuth().role === "admin" ? null : (
                    <Redirect to="/" />
                  )
                ) : (
                  <Redirect to="/login" />
                )}

                <div className="justify-content-center  align-items-center align-content-center text-center">
                  <form
                    className="form-signin text-center col-6  "
                    onSubmit={handleSubmit}
                  >
                    <h1 className="h3 mb-3 font-weight-normal card-title">
                      Please Register
                    </h1>
                    <select
                      value={role}
                      onChange={handleChange("role")}
                      className="form-control m-4 "
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                    </select>

                    <input
                      type="text"
                      className="form-control m-4 "
                      placeholder="Name"
                      required
                      onChange={handleChange("name")}
                      value={name}
                    />
                    <input
                      type="email"
                      className="form-control m-4 "
                      placeholder="Email address"
                      required
                      autoFocus
                      onChange={handleChange("email")}
                      value={email}
                    />

                    <input
                      type="password"
                      className="form-control m-4 "
                      placeholder="Password"
                      required
                      onChange={handleChange("password1")}
                      value={password1}
                    />
                    <input
                      type="password"
                      className="form-control m-4 "
                      placeholder="Confirm password"
                      required
                      onChange={handleChange("password2")}
                      value={password2}
                    />

                    <input
                      type="text"
                      className="form-control m-4 "
                      placeholder="Image url"
                      required
                      onChange={handleChange("imagePath")}
                      value={imagePath}
                    />

                    <button
                      className="btn btn-lg btn-success btn-block m-4 "
                      type="submit"
                    >
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <Footer></Footer>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Register;
