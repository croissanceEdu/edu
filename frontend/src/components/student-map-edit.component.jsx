import React, { useState, Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import { isAuth } from "../helpers/auth";
import Footer from "./footer.component";
import Navbar from "./navbar.component";
class StudentMapEdit extends Component {
  constructor(props) {
    super(props);

    this.onChangeClassLink = this.onChangeClassLink.bind(this);

    this.state = {
      studentOptions: [],
      teacherOptions: [],
      studentID: "",
      teacherID: "",
      classLink: "",
      studentMap: [],
    };
  }

  //submit to backend
  handleSubmit(e) {
    e.preventDefault();
    const studentID = this.state.studentID;
    const teacherID = this.state.teacherID;
    const classLink = e.target.classLink.value;

    if (studentID && teacherID) {
      axios
        .put(
          `${process.env.REACT_APP_SERVER_URL}/syllabus/map/` +
            this.props.match.params.id,
          {
            studentID,
            teacherID,
            classLink,
          }
        )
        .then((response) => {
          this.setState({ studentMap: response.data.studentMap });
          e.target.classLink.value = "";
          window.location =
            isAuth().role === "admin" ? "/manage" : "/joinclass";
          toast.success(response.data.message);
        });
    } else {
      toast.error("please fill all fields");
    }
  }
  componentDidMount() {
    this.bindStudent();
    this.bindTeacher();
    this.bindStudentMap();
  }
  bindStudentMap() {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/syllabus/map/` +
          this.props.match.params.id
      )
      .then((response) => {
        // toast.success(response.data.message);
        this.setState({
          studentMap: response.data.studentMap,
          studentID: response.data.studentMap.studentID,
          teacherID: response.data.studentMap.teacherID,
          classLink: response.data.studentMap.classLink,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  bindTeacher() {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/user/get`, {
        _id: "",
        role: "teacher",
      })
      .then((response) => {
        this.setState({ teacherOptions: response.data.userOptions });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  bindStudent() {
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/user/get`, {
        _id: "",
        role: "student",
      })
      .then((response) => {
        this.setState({ studentOptions: response.data.userOptions });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onChangeClassLink(e) {
    this.setState({
      classLink: e.target.value,
    });
  }
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <section className=" mbr-section mbr-after-navbar text-center w3-dark-gray">
          <div className="container  min-vh-100">
            <div className="row">
              <div className="container card m-4 p-4">
                {isAuth() ? (
                  isAuth().role === "admin" ? null : isAuth().role ===
                    "teacher" ? null : (
                    <Redirect to="/" />
                  )
                ) : (
                  <Redirect to="/login" />
                )}
                <form
                  onSubmit={(props) => {
                    this.handleSubmit(props);
                  }}
                >
                  {/* <h3>
              {this.state.teacherID}
              {" - "}
              {this.state.studentID}
            </h3> */}
                  <h3>Class Link</h3>
                  <div className="form-group">
                    <textarea
                      placeholder="class Link"
                      className="form-control "
                      name="classLink"
                      id="classLink"
                      rows="3"
                      value={this.state.classLink}
                      onChange={this.onChangeClassLink}
                    ></textarea>
                  </div>

                  <div className="form-group row">
                    <div className="offset-sm-2 col-sm-10">
                      <button
                        type="submit"
                        className="btn btn-primary  float-right"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>{" "}
        <Footer />
      </React.Fragment>
    );
  }
}

export default StudentMapEdit;
