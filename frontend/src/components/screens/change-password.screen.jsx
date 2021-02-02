import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { isAuth } from "../../helpers/auth";
import { Redirect } from "react-router-dom";
import Navbar from "../navbar.component";
import Footer from "../footer.component";

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  }

  //handle input changes
  handleChange(props) {
    this.setState({ [props.target.id]: props.target.value });
  }
  //submit to backend
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    if (
      this.state.currentPassword &&
      this.state.newPassword &&
      this.state.confirmPassword
    ) {
      if (this.state.newPassword === this.state.confirmPassword) {
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/api/changepassword`, {
            _id: isAuth()._id,
            currentPassword: this.state.currentPassword,
            newPassword: this.state.newPassword,
          })
          .then((res) => {
            toast.success(res.data.message);
            this.setState({
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
          })
          .catch((err) => {
            toast.error(err.response.data.error);
          });
      } else {
        toast.error("Password doesn't match");
      }
    } else {
      toast.error("please fill all fields");
    }
  }

  render() {
    return (
      <React.Fragment>
        {!isAuth() ? (
          <Redirect to="/login" />
        ) : (
          <React.Fragment>
            <Navbar />
            <section className="mbr-section mbr-after-navbar  w3-grey   min-vh-100 ">
              <div className="m-2  ">
                <form
                  className="form-signin text-center col-6  "
                  onSubmit={this.handleSubmit}
                >
                  <div className="text-center mb-4">
                    <h1 className="h3 mb-3 font-weight-normal">
                      {" "}
                      Change Password
                    </h1>
                  </div>

                  <div className="form-label-group ">
                    <input
                      type="password"
                      id="currentPassword"
                      className="form-control "
                      placeholder="Password"
                      required
                      onChange={this.handleChange}
                      value={this.state.currentPassword}
                    />
                    <label htmlFor="currentPassword">Current Password</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      type="password"
                      id="newPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                      onChange={this.handleChange}
                      value={this.state.newPassword}
                    />
                    <label htmlFor="newPassword">New Password</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="confirmPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                      onChange={this.handleChange}
                      value={this.state.confirmPassword}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                  </div>

                  <button
                    className="btn btn-lg btn-primary btn-block "
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </section>
            <Footer />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default ChangePassword;
